"""Claude API を使って X 投稿文を生成する。

バズ型テンプレートとトピック候補をランダムに組み合わせ、
1投稿あたり280文字以内の日本語テキストを出力する。
"""

from __future__ import annotations

import json
import random
import uuid
from datetime import datetime, timezone
from pathlib import Path

from anthropic import Anthropic

from src.config import PENDING_DIR, Settings, load_topics, load_viral_patterns

SYSTEM_PROMPT = """\
あなたは日本語X(旧Twitter)で、雑学・ライフハック・心に響く言葉の投稿を作るプロの運用者です。

厳守するルール:
1. 日本語で書く
2. 本文は 140文字以内(半角280文字相当)に収める - これは絶対
3. ハッシュタグは付けない (アルゴリズム上、一般投稿では不利なので)
4. URLは付けない
5. 絵文字は 0〜1個まで(bot感を避けるため)
6. 「いいね!してね」「フォローしてね」等のCTAは書かない
7. 断定できない医療/法律/投資アドバイスは書かない
8. 政治・宗教・時事批判は避ける
9. 特定の誰かを揶揄する内容は書かない
10. 改行を適切に入れて、読みやすいリズムを作る

出力形式:
- 投稿本文のテキストのみを出力。前置き・解説・引用符は付けない。
"""

USER_PROMPT_TEMPLATE = """\
以下の「型」と「テーマ」で X 投稿を1つ書いてください。

# 型: {pattern_name}

{pattern_structure}

# 参考例(この構造を守って、内容は自由に作る)

{pattern_example}

# 今回のテーマ

{topic}

# 追加指示

- 上の型の構造を厳密に守りながら、テーマに沿った内容にすること
- 冒頭1行でスクロールを止める引きを作ること
- 最後は余韻を残すか、読者に気づきを与える一文で終わる
- 140文字以内に収める
"""


class Generator:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        self.client = Anthropic(api_key=self.settings.anthropic_api_key)
        self.patterns = load_viral_patterns()
        self.topics = load_topics()["themes"]

    def generate_one(
        self,
        *,
        pattern_id: str | None = None,
        topic: str | None = None,
    ) -> dict:
        pattern = (
            next(p for p in self.patterns if p["id"] == pattern_id)
            if pattern_id
            else random.choice(self.patterns)
        )
        theme = topic or random.choice(self.topics)

        user_prompt = USER_PROMPT_TEMPLATE.format(
            pattern_name=pattern["name"],
            pattern_structure=pattern["structure"],
            pattern_example=pattern["example"],
            topic=theme,
        )

        response = self.client.messages.create(
            model=self.settings.anthropic_model,
            max_tokens=500,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
        text = response.content[0].text.strip()

        # 140文字(半角280文字)超過は切らずに再生成を促すマーカー付きで保存
        over_limit = len(text) > 140

        return {
            "id": f"{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}-{uuid.uuid4().hex[:6]}",
            "text": text,
            "pattern_id": pattern["id"],
            "pattern_name": pattern["name"],
            "topic": theme,
            "char_count": len(text),
            "over_limit": over_limit,
            "model": self.settings.anthropic_model,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "status": "pending",
        }

    def generate_batch(self, count: int) -> list[Path]:
        PENDING_DIR.mkdir(parents=True, exist_ok=True)
        paths: list[Path] = []
        for _ in range(count):
            post = self.generate_one()
            path = PENDING_DIR / f"{post['id']}.json"
            path.write_text(
                json.dumps(post, ensure_ascii=False, indent=2), encoding="utf-8"
            )
            paths.append(path)
        return paths
