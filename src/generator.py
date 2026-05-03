"""Claude API で X投稿 / ブログ記事を生成する。

中核ロジック:
  1. data/products.yaml から商品を1件選ぶ
  2. researcher.py で楽天APIから商品情報、バズサンプルを取得
  3. テンプレ(型) + 商品情報 + バズ参考例 を組み合わせて Claude に渡す
  4. X投稿(本ツイート + リプライ) または ブログ記事を生成
"""

from __future__ import annotations

import json
import random
import uuid
from datetime import datetime, timezone
from pathlib import Path

from anthropic import Anthropic

from src.config import (
    PENDING_DIR,
    Settings,
    load_blog_patterns,
    load_thread_patterns,
    load_x_patterns,
)
from src.researcher import ResearchBundle, Researcher

X_SYSTEM_PROMPT = """\
あなたは日本語X(旧Twitter)で、実体験ベースの商品レビュー投稿を作るプロの運用者です。

厳守するルール:
1. 日本語で書く
2. 本文は 140文字以内(全角140 / 半角280) - これは絶対
3. ハッシュタグは付けない (一般投稿では拡散の足を引っ張る)
4. URLは付けない (本文には書かない、リプライ側で別途案内する)
5. 絵文字は 0〜1個まで(bot感を避けるため)
6. 「いいね」「フォロー」「リプ」誘導はしない
7. 「PR」「広告」と明示しない (リプ側のリンクで「※楽天アフィリエイト含む」と表記)
8. 過剰な薬事/効果効能の断定はしない (「治る」「絶対に効く」などNG)
9. 政治・宗教・他者批判は書かない
10. 改行を適切に入れて、3秒で読めるリズムを作る
11. 商品名は1〜2回までに留める (売り込み感を出さない)
12. 「実体験」のトーン。妻が実際に買って使った前提で語る

出力形式:
- 投稿本文のテキストのみ。前置き・解説・引用符は付けない。
"""

X_USER_TEMPLATE = """\
# 商品情報 (妻が実際に買ったもの)

商品名: {product_name}
カテゴリ: {category}
抱えていた問題: {problem}
使ってみた体験: {experience}
おすすめしたい人: {recommended_for}

# 楽天での実勢価格・評価 (リアリティ用)

{rakuten_summary}

# バズ参考例 (構造を真似する。内容はパクらない)

{buzz_block}

# 今回の型

型ID: {pattern_id}
型名: {pattern_name}
構造:
{pattern_structure}
制約:
{pattern_constraints}

# 出力

上記の型と制約に厳密に従って、X投稿の本文を1つ生成してください。
"""

BLOG_SYSTEM_PROMPT = """\
あなたは商品レビュー専門の日本語ブロガーです。SEOと読みやすさを両立する記事を書きます。

厳守するルール:
1. はてなブログMarkdown記法で書く (見出しは ## ### ...)
2. 1500〜3000字を目安
3. 体験談ベース、妻が実際に買って使った前提
4. 過剰な薬事/効果効能の断定はしない
5. 「特定商取引法に基づく表記」相当の文言は不要 (個別記事では)
6. 商品名は自然に出す (詰め込みすぎない、SEOキーワードを意識)
7. 必ず「気になった点」セクションを入れる (信頼性UP)
8. 文末に「※本記事には楽天アフィリエイトリンクを含みます」を1行追加
9. アフィリエイトリンクは {AFFILIATE_LINK} という placeholder で記載 (後でツールが置換)

出力形式:
- 1行目: タイトル (h1にせず、はてなブログのタイトルフィールド用)
- 2行目以降: 本文Markdown
- タイトルと本文の間は空行1つ
"""

THREAD_SYSTEM_PROMPT = """\
あなたは日本語X(旧Twitter)で、お金や経済の難しい概念を主婦でもわかる物語に仕立てるプロです。

厳守するルール:
1. 日本語で書く
2. 各ツイートは 140文字以内 (全角140 / 半角280) - 絶対
3. ハッシュタグは付けない
4. URLは付けない
5. 絵文字は使わない (bot感を避けるため、教育コンテンツでは特に)
6. 「いいね」「フォロー」「リプ」誘導はしない
7. 政治・宗教・他者批判は書かない
8. 過度な投資勧誘 / 「絶対儲かる」表現はしない
9. 「専門用語」を使うときは必ず登場人物の対話で噛み砕いて説明
10. 読者は主婦想定。難しい用語・記号は最小限に

出力形式 (厳守):
- 各ツイートを以下のマーカーで区切る:
=== TWEET 1 ===
本文...

=== TWEET 2 ===
本文...

(最後のツイートまで同様)
- マーカーの前後に余分な解説や前置きを書かない
- 各ツイート本文に「(続く)」「次のツイートへ」のような露骨な引きを書かない
"""

THREAD_USER_TEMPLATE = """\
# 今回のテーマ

タイトル: {topic_title}
カテゴリ: {category}

# 解説する核となる概念 (これを物語で表現する)

{key_concept}

# 数字の前提 / 問題設定

{setup}

# 登場人物

A (教える側): {teacher}
B (学ぶ側): {learner}

# ストーリーの大筋

{story_arc}

# 最後に伝える教訓

{lesson}

# 使う型

型ID: {pattern_id}
型名: {pattern_name}
構造:
{pattern_structure}
制約:
{pattern_constraints}

# 出力指示

上記の素材で、{length}個のツイートからなるXスレッドを書いてください。
各ツイート 140文字以内。マーカー (=== TWEET N ===) で区切ること。
全体で1つの物語として読んだとき、初心者(主婦)でも納得できる流れにすること。
"""

BLOG_USER_TEMPLATE = """\
# 商品情報 (妻が実際に買ったもの)

商品名: {product_name}
カテゴリ: {category}
抱えていた問題: {problem}
使ってみた体験: {experience}
おすすめしたい人: {recommended_for}
購入価格: {price_paid}円

# 楽天での実勢価格・評価 (記事内に自然に組み込む材料)

{rakuten_summary}

# 今回の型

型ID: {pattern_id}
型名: {pattern_name}
SEO狙い:
{pattern_seo_focus}
構造:
{pattern_structure}
アフィリ配置の指針:
{pattern_affiliate}

# 出力

上記の型に従って、はてなブログ記事を1本生成してください。
タイトルは1行目、本文は2行目以降。
アフィリリンクを入れたい箇所には {{AFFILIATE_LINK}} と書いてください (後で置換)。
"""


def _format_rakuten_summary(bundle: ResearchBundle) -> str:
    if not bundle.rakuten:
        return "(楽天API情報なし。商品情報のみで生成してください。)"
    r = bundle.rakuten
    parts = [
        f"楽天での商品名: {r.name}",
        f"価格: {r.price}円",
        f"ショップ: {r.shop_name}",
    ]
    if r.review_average is not None and r.review_count:
        parts.append(f"レビュー: ★{r.review_average} ({r.review_count}件)")
    return "\n".join(parts)


def _format_buzz_block(bundle: ResearchBundle) -> str:
    if not bundle.buzz_examples:
        return "(参考例なし)"
    blocks = []
    for ex in bundle.buzz_examples:
        block = (
            f"--- {ex.get('id', '?')} ({ex.get('category', '')}) ---\n"
            f"フック: {ex.get('hook', '')}\n"
            f"構造: {ex.get('structure', '').strip()}\n"
            f"なぜバズったか: {ex.get('why_works', '').strip()}"
        )
        blocks.append(block)
    return "\n\n".join(blocks)


class Generator:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        self.client = Anthropic(api_key=self.settings.anthropic_api_key)
        self.x_patterns = load_x_patterns()
        self.blog_patterns = load_blog_patterns()
        self.thread_patterns = load_thread_patterns()
        self.researcher = Researcher(self.settings)

    # -------------------------- X投稿 --------------------------

    def generate_x_post(
        self,
        product: dict,
        *,
        pattern_id: str | None = None,
    ) -> dict:
        bundle = self.researcher.research(product)
        pattern = self._pick_x_pattern(pattern_id)

        user_prompt = X_USER_TEMPLATE.format(
            product_name=product.get("name", ""),
            category=product.get("category", ""),
            problem=product.get("problem", "").strip(),
            experience=product.get("experience", "").strip(),
            recommended_for=product.get("recommended_for", ""),
            rakuten_summary=_format_rakuten_summary(bundle),
            buzz_block=_format_buzz_block(bundle),
            pattern_id=pattern["id"],
            pattern_name=pattern["name"],
            pattern_structure=pattern.get("structure", "").strip(),
            pattern_constraints=pattern.get("constraints", "").strip(),
        )

        resp = self.client.messages.create(
            model=self.settings.anthropic_model,
            max_tokens=600,
            system=X_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
        text = resp.content[0].text.strip()

        affiliate_url = bundle.rakuten.affiliate_url if bundle.rakuten else None
        # リプ用テキスト: ブログ記事URLが将来できたらそちらを優先する想定
        # 現時点ではアフィリリンク直貼り (※マーク付き)
        reply_text = (
            f"使ったのはこれです👇\n{affiliate_url}\n※楽天アフィリエイト含む"
            if affiliate_url
            else None
        )

        return {
            "id": _new_id(),
            "type": "x",
            "product_id": product.get("id"),
            "pattern_id": pattern["id"],
            "pattern_name": pattern["name"],
            "text": text,
            "char_count": len(text),
            "over_limit": len(text) > 140,
            "reply_text": reply_text,
            "affiliate_url": affiliate_url,
            "rakuten": bundle.rakuten.to_dict() if bundle.rakuten else None,
            "model": self.settings.anthropic_model,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

    def _pick_x_pattern(self, pattern_id: str | None) -> dict:
        if pattern_id:
            return next(p for p in self.x_patterns if p["id"] == pattern_id)
        return random.choice(self.x_patterns)

    # -------------------------- ブログ --------------------------

    def generate_blog_post(
        self,
        product: dict,
        *,
        pattern_id: str | None = None,
    ) -> dict:
        bundle = self.researcher.research(product)
        pattern = self._pick_blog_pattern(pattern_id)

        user_prompt = BLOG_USER_TEMPLATE.format(
            product_name=product.get("name", ""),
            category=product.get("category", ""),
            problem=product.get("problem", "").strip(),
            experience=product.get("experience", "").strip(),
            recommended_for=product.get("recommended_for", ""),
            price_paid=product.get("price_paid", "?"),
            rakuten_summary=_format_rakuten_summary(bundle),
            pattern_id=pattern["id"],
            pattern_name=pattern["name"],
            pattern_seo_focus=pattern.get("seo_focus", "").strip(),
            pattern_structure=pattern.get("structure", "").strip(),
            pattern_affiliate=pattern.get("affiliate_placement", "").strip(),
        )

        resp = self.client.messages.create(
            model=self.settings.anthropic_model,
            max_tokens=4000,
            system=BLOG_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
        raw = resp.content[0].text.strip()
        title, body = _split_title_body(raw)

        # アフィリンクを実URLに置換
        affiliate_url = bundle.rakuten.affiliate_url if bundle.rakuten else None
        if affiliate_url:
            link_html = (
                f'<a href="{affiliate_url}" target="_blank" rel="nofollow noopener">'
                f"{bundle.rakuten.name}を楽天市場で見る</a>"
            )
            body = body.replace("{AFFILIATE_LINK}", link_html)
        else:
            body = body.replace("{AFFILIATE_LINK}", "")

        return {
            "id": _new_id(),
            "type": "blog",
            "product_id": product.get("id"),
            "pattern_id": pattern["id"],
            "pattern_name": pattern["name"],
            "title": title,
            "body_markdown": body,
            "char_count": len(body),
            "affiliate_url": affiliate_url,
            "rakuten": bundle.rakuten.to_dict() if bundle.rakuten else None,
            "model": self.settings.anthropic_model,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

    def _pick_blog_pattern(self, pattern_id: str | None) -> dict:
        if pattern_id:
            return next(p for p in self.blog_patterns if p["id"] == pattern_id)
        return self.blog_patterns[0]  # デフォルトは product_review

    # -------------------------- Xスレッド (教育系ストーリー) --------------------------

    def generate_x_thread(
        self,
        topic: dict,
        *,
        length: int = 6,
        pattern_id: str | None = None,
    ) -> dict:
        pattern = self._pick_thread_pattern(pattern_id)
        chars = topic.get("characters", {}) or {}
        teacher = chars.get("teacher", "知ってる側の人")
        learner = chars.get("learner", "学ぶ側の人")

        user_prompt = THREAD_USER_TEMPLATE.format(
            topic_title=topic.get("title", ""),
            category=topic.get("category", ""),
            key_concept=topic.get("key_concept", "").strip(),
            setup=topic.get("setup", "").strip(),
            teacher=teacher,
            learner=learner,
            story_arc=topic.get("story_arc", "").strip(),
            lesson=topic.get("lesson", "").strip(),
            pattern_id=pattern["id"],
            pattern_name=pattern["name"],
            pattern_structure=pattern.get("structure", "").strip(),
            pattern_constraints=pattern.get("constraints", "").strip(),
            length=length,
        )

        resp = self.client.messages.create(
            model=self.settings.anthropic_model,
            max_tokens=2000,
            system=THREAD_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
        raw = resp.content[0].text.strip()
        tweets = _parse_thread(raw)

        return {
            "id": _new_id(),
            "type": "x_thread",
            "topic_id": topic.get("id"),
            "topic_title": topic.get("title"),
            "pattern_id": pattern["id"],
            "pattern_name": pattern["name"],
            "tweets": [
                {
                    "text": t,
                    "char_count": len(t),
                    "over_limit": len(t) > 140,
                }
                for t in tweets
            ],
            "tweet_count": len(tweets),
            "model": self.settings.anthropic_model,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

    def _pick_thread_pattern(self, pattern_id: str | None) -> dict:
        if pattern_id:
            return next(p for p in self.thread_patterns if p["id"] == pattern_id)
        return self.thread_patterns[0]  # デフォルトは dialogue_revelation

    # -------------------------- 保存 --------------------------

    def save(self, post: dict) -> Path:
        PENDING_DIR.mkdir(parents=True, exist_ok=True)
        path = PENDING_DIR / f"{post['id']}.json"
        path.write_text(json.dumps(post, ensure_ascii=False, indent=2), encoding="utf-8")
        return path


def _new_id() -> str:
    return f"{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}-{uuid.uuid4().hex[:6]}"


def _split_title_body(raw: str) -> tuple[str, str]:
    lines = raw.splitlines()
    if not lines:
        return "(no title)", ""
    title = lines[0].lstrip("# ").strip()
    body = "\n".join(lines[1:]).lstrip("\n")
    return title, body


def _parse_thread(raw: str) -> list[str]:
    """Claudeの出力からツイートを抽出する.

    マーカー === TWEET N === で区切られた各ブロックの本文を取り出す。
    """
    import re

    parts = re.split(r"={3,}\s*TWEET\s*\d+\s*={3,}", raw)
    tweets = [p.strip() for p in parts if p.strip()]
    return tweets
