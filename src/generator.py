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
    load_chiiku_patterns,
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

CAROUSEL_SYSTEM_PROMPT = """\
あなたは日本語Instagramで、子育て中のママに向けて知育のヒントを発信するアカウントの中の人です。
パステル調・手書き風のカルーセル投稿(5枚)の素材を作ります。

厳守するルール:
1. 教育者ぶらず、フラットな目線
2. 「学習教材」や通信教育の宣伝はしない
3. 「PR」「広告」と取られる商業誘導はしない
4. 政治・宗教・他者批判は書かない
5. 押し付けにならない、柔らかいトーン
6. 「うちの場合」を強調する書き方
7. 専門用語は最小限。主婦読者を想定

出力形式 (厳密に従う):
=== SLIDE 1 (hook) ===
title: <スマホ画面で目を止める強烈な12字以内のキャッチ>
subtitle: <タイトルを補う18字以内の一文>

=== SLIDE 2 (content) ===
heading: <スライドの見出し 14字以内>
body: <2-3行の説明 1行18字×3まで>

=== SLIDE 3 (content) ===
heading: ...
body: ...

=== SLIDE 4 (content) ===
heading: ...
body: ...

=== SLIDE 5 (outro) ===
title: <12字以内、まとめ・気づきの一言>
subtitle: <20字以内、保存しておくと役立つ等>

=== CAPTION ===
<120-180字の本文>

#知育 #子育て #遊びで学ぶ
(その他、関連するハッシュタグを5-10個)

注意:
- title/subtitle/heading/body の中で改行コードは使わない (1行で書く)
- ただし読みやすさのため句読点は入れてOK
- ハッシュタグはCAPTION内にだけ書く
- 各値はマーカー直後の同じ行 or 次の行に1つだけ
"""

CAROUSEL_USER_TEMPLATE = """\
# 今回のネタ

トピック: {topic_title}
背景:
{topic_description}
対象年齢: {age_range}

# 今回切り取るアングル (このメリットを軸に)

学べること: {angle_learning}
具体的なシーン:
{angle_scene}

# 出力指示

上のネタとアングルで、5枚のカルーセル素材 + キャプションを生成してください。
カルーセルの流れ:
- スライド1 (hook): 強い結論・引きで止める
- スライド2-4 (content): メリットの内訳・具体例・親が気をつけること
- スライド5 (outro): まとめ + 「保存して」のような柔らかい誘導
"""

CHIIKU_SYSTEM_PROMPT = """\
あなたは日本語X(旧Twitter)で、子育て中のママに向けて知育のヒントを発信するアカウントの中の人です。
教育者ぶらず、専業主婦・働く主婦のリアルな目線で書きます。

厳守するルール:
1. 日本語で書く
2. 本文は 140文字以内 (全角140 / 半角280) - これは絶対
3. ハッシュタグは付けない
4. URLは付けない
5. 絵文字は使わない (信頼性を保つため)
6. 「いいね」「フォロー」「リプ」誘導はしない
7. 「PR」「広告」と取られる商業誘導はしない (商品を売り込まない)
8. 学習教材・通信教育の宣伝はしない (タイプの違う投稿)
9. 政治・宗教・他者批判は書かない
10. 「子供を早期教育で…」のような押し付けにならない柔らかいトーン
11. 自慢にならない (「うちの子天才」NG)
12. 主語は「うちの子」「うちの息子/娘」「うちの場合」
13. 改行を適切に入れて、3秒で読めるリズムを作る

出力形式:
- 投稿本文のテキストのみを出力。前置き・解説・引用符は付けない。
"""

CHIIKU_USER_TEMPLATE = """\
# 今回のネタ

トピック: {topic_title}
背景:
{topic_description}
対象年齢: {age_range}

# 今回切り取るアングル (このメリットを軸に書く)

学べること: {angle_learning}
具体的なシーン:
{angle_scene}

# 今回の型

型ID: {pattern_id}
型名: {pattern_name}
構造:
{pattern_structure}
制約:
{pattern_constraints}

# 出力指示

上の型・制約に厳密に従って、X投稿1つを書いてください。
「うちの場合」のリアルな目線で、自慢にならず、押し付けにならないトーンで。
本文140字以内、ハッシュタグ・絵文字・URLなし。
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
        self.chiiku_patterns = load_chiiku_patterns()
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

    # -------------------------- 知育投稿 (単発、ママ層向け) --------------------------

    def generate_chiiku_post(
        self,
        topic: dict,
        angle: dict,
        *,
        pattern_id: str | None = None,
    ) -> dict:
        """知育トピック × アングルから単発X投稿を生成する."""
        pattern = self._pick_chiiku_pattern(pattern_id)

        user_prompt = CHIIKU_USER_TEMPLATE.format(
            topic_title=topic.get("title", ""),
            topic_description=topic.get("description", "").strip(),
            age_range=topic.get("age_range", ""),
            angle_learning=angle.get("learning", ""),
            angle_scene=angle.get("scene", "").strip(),
            pattern_id=pattern["id"],
            pattern_name=pattern["name"],
            pattern_structure=pattern.get("structure", "").strip(),
            pattern_constraints=pattern.get("constraints", "").strip(),
        )

        resp = self.client.messages.create(
            model=self.settings.anthropic_model,
            max_tokens=600,
            system=CHIIKU_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
        text = resp.content[0].text.strip()

        return {
            "id": _new_id(),
            "type": "x",
            "subtype": "chiiku",
            "topic_id": topic.get("id"),
            "topic_title": topic.get("title"),
            "angle_id": angle.get("id"),
            "angle_learning": angle.get("learning"),
            "pattern_id": pattern["id"],
            "pattern_name": pattern["name"],
            "text": text,
            "char_count": len(text),
            "over_limit": len(text) > 140,
            "reply_text": None,
            "model": self.settings.anthropic_model,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

    def _pick_chiiku_pattern(self, pattern_id: str | None) -> dict:
        if pattern_id:
            return next(p for p in self.chiiku_patterns if p["id"] == pattern_id)
        # デフォルトは tip(メイン) を 2/3、experience(サブ) を 1/3 でランダム
        return random.choices(
            self.chiiku_patterns,
            weights=[2 if p["id"] == "tip" else 1 for p in self.chiiku_patterns],
            k=1,
        )[0]

    # -------------------------- 知育インスタカルーセル --------------------------

    def generate_chiiku_carousel(
        self,
        topic: dict,
        angle: dict,
    ) -> dict:
        """知育トピック × アングルから5枚スライドのカルーセル素材を生成する.

        生成内容:
          - 5スライド (hook / content×3 / outro)
          - インスタ用キャプション (130-200字 + ハッシュタグ)
        """
        user_prompt = CAROUSEL_USER_TEMPLATE.format(
            topic_title=topic.get("title", ""),
            topic_description=topic.get("description", "").strip(),
            age_range=topic.get("age_range", ""),
            angle_learning=angle.get("learning", ""),
            angle_scene=angle.get("scene", "").strip(),
        )

        resp = self.client.messages.create(
            model=self.settings.anthropic_model,
            max_tokens=2000,
            system=CAROUSEL_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
        raw = resp.content[0].text.strip()
        slides, caption = _parse_carousel(raw)

        return {
            "id": _new_id(),
            "type": "instagram_carousel",
            "subtype": "chiiku",
            "topic_id": topic.get("id"),
            "topic_title": topic.get("title"),
            "angle_id": angle.get("id"),
            "angle_learning": angle.get("learning"),
            "slides": slides,
            "caption": caption,
            "model": self.settings.anthropic_model,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

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


def _parse_carousel(raw: str) -> tuple[list[dict], str]:
    """Claudeの出力からスライド配列とキャプションを抽出する.

    マーカー === SLIDE N (type) === / === CAPTION === でブロックを分ける。
    各スライド本文中の "title: ...", "subtitle: ...", "heading: ...", "body: ..."
    を key:value として読む。
    """
    import re

    # ブロック単位で分割
    pattern = r"={3,}\s*(SLIDE\s*\d+\s*\(\w+\)|CAPTION)\s*={3,}"
    parts = re.split(pattern, raw)
    slides: list[dict] = []
    caption = ""
    # parts: ['', marker1, content1, marker2, content2, ...]
    i = 1
    while i < len(parts):
        marker = parts[i].strip()
        content = parts[i + 1] if i + 1 < len(parts) else ""
        if marker.startswith("SLIDE"):
            # type名取り出し
            m = re.search(r"\(\s*(\w+)\s*\)", marker)
            stype = m.group(1) if m else "content"
            slide: dict = {"type": stype}
            for line in content.splitlines():
                line = line.strip()
                if not line:
                    continue
                kv = re.match(r"^(title|subtitle|heading|body)\s*:\s*(.+)$", line)
                if kv:
                    key = kv.group(1)
                    val = kv.group(2).strip()
                    if key in slide:
                        slide[key] = (slide[key] + " " + val).strip()
                    else:
                        slide[key] = val
                elif slide:
                    # 値のラップ (2行目以降)
                    last_key = next(
                        (
                            k
                            for k in ("body", "subtitle", "heading", "title")
                            if k in slide
                        ),
                        None,
                    )
                    if last_key:
                        slide[last_key] = (slide[last_key] + " " + line).strip()
            slides.append(slide)
        elif marker.startswith("CAPTION"):
            caption = content.strip()
        i += 2

    return slides, caption
