"""X API v2 (Free tier) で承認済み投稿を公開する。

Free tier 制約:
- User Post: 月 500 / 24h 17 / 15分 1 (2026年時点)
- 本モジュールは 1 日あたりの上限を settings.MAX_POSTS_PER_DAY でソフト制限
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import tweepy

from src.config import PUBLISHED_DIR, Settings


class Publisher:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        self.client = tweepy.Client(
            consumer_key=self.settings.x_api_key,
            consumer_secret=self.settings.x_api_secret,
            access_token=self.settings.x_access_token,
            access_token_secret=self.settings.x_access_token_secret,
        )

    def verify(self) -> str:
        """接続確認用。OAuth1.0a で me を取得する。"""
        me = self.client.get_me(user_auth=True)
        return me.data.username if me.data else "unknown"

    def post_text(self, text: str) -> dict:
        """1件のテキスト投稿を公開する。"""
        resp = self.client.create_tweet(text=text, user_auth=True)
        return {
            "tweet_id": resp.data["id"],
            "url": f"https://x.com/{self.settings.x_username}/status/{resp.data['id']}",
            "posted_at": datetime.now(timezone.utc).isoformat(),
        }

    def publish_from_file(self, path: Path) -> dict:
        post = json.loads(path.read_text(encoding="utf-8"))
        if post.get("status") != "approved":
            raise ValueError(f"未承認の投稿は送信できません: {path.name}")

        result = self.post_text(post["text"])
        post.update(result)
        post["status"] = "published"

        PUBLISHED_DIR.mkdir(parents=True, exist_ok=True)
        new_path = PUBLISHED_DIR / path.name
        new_path.write_text(
            json.dumps(post, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        path.unlink()
        return post
