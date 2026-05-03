"""承認済み投稿を X / はてなブログ に公開する。

X側:
  - 本ツイート + 任意のリプライ(アフィリリンク)を連投
  - tweepy を使った OAuth 1.0a User Context

ブログ側:
  - はてなブログ AtomPub で記事投稿
  - https://developer.hatena.ne.jp/ja/documents/blog/apis/atom

Free tier の Pay Per Use では投稿1件あたり数円〜十数円のコストがかかる。
1日の上限は settings.MAX_POSTS_PER_DAY でソフト制限。
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

import requests
import tweepy
from requests.auth import HTTPBasicAuth

from src.config import PUBLISHED_DIR, Settings


# ============================================================
# X (旧Twitter)
# ============================================================


class XPublisher:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        self.client = tweepy.Client(
            consumer_key=self.settings.x_api_key,
            consumer_secret=self.settings.x_api_secret,
            access_token=self.settings.x_access_token,
            access_token_secret=self.settings.x_access_token_secret,
        )

    def verify(self) -> str:
        """接続確認用. OAuth1.0a で me を取得."""
        me = self.client.get_me(user_auth=True)
        return me.data.username if me.data else "unknown"

    def post_text(self, text: str, *, in_reply_to: str | None = None) -> dict:
        kwargs: dict = {"text": text, "user_auth": True}
        if in_reply_to:
            kwargs["in_reply_to_tweet_id"] = in_reply_to
        resp = self.client.create_tweet(**kwargs)
        tid = resp.data["id"]
        return {
            "tweet_id": tid,
            "url": f"https://x.com/{self.settings.x_username}/status/{tid}",
            "posted_at": datetime.now(timezone.utc).isoformat(),
        }

    def publish_from_file(self, path: Path) -> dict:
        """承認済みX投稿(本文 + 任意のリプライ)を投稿する."""
        post = json.loads(path.read_text(encoding="utf-8"))
        if post.get("status") != "approved":
            raise ValueError(f"未承認の投稿は送信できません: {path.name}")
        if post.get("type") != "x":
            raise ValueError(f"X投稿ではありません: {path.name} (type={post.get('type')})")

        main = self.post_text(post["text"])
        post["main"] = main

        reply_text = post.get("reply_text")
        if reply_text:
            reply = self.post_text(reply_text, in_reply_to=main["tweet_id"])
            post["reply"] = reply

        post["status"] = "published"
        post["published_at"] = datetime.now(timezone.utc).isoformat()
        return _move_to_published(post, path)

    def post_thread(self, tweets: list[str]) -> list[dict]:
        """ツイートのリストをスレッドとして連投する (各ツイートを前のツイートのリプライにする)."""
        results: list[dict] = []
        previous_id: str | None = None
        for text in tweets:
            r = self.post_text(text, in_reply_to=previous_id)
            results.append(r)
            previous_id = str(r["tweet_id"])
        return results

    def publish_thread_from_file(self, path: Path) -> dict:
        """承認済みスレッドを連投する."""
        post = json.loads(path.read_text(encoding="utf-8"))
        if post.get("status") != "approved":
            raise ValueError(f"未承認のスレッドは送信できません: {path.name}")
        if post.get("type") != "x_thread":
            raise ValueError(f"スレッド投稿ではありません: {path.name} (type={post.get('type')})")

        tweet_texts = [t["text"] for t in post.get("tweets", [])]
        if not tweet_texts:
            raise ValueError(f"スレッドにツイートが含まれていません: {path.name}")

        results = self.post_thread(tweet_texts)
        post["tweet_results"] = results
        post["status"] = "published"
        post["published_at"] = datetime.now(timezone.utc).isoformat()
        return _move_to_published(post, path)


# ============================================================
# はてなブログ
# ============================================================


HATENA_ATOM_NS = "http://www.w3.org/2005/Atom"
HATENA_APP_NS = "http://www.w3.org/2007/app"


class HatenaPublisher:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        if not self.settings.has_hatena():
            raise RuntimeError(
                "はてなブログAPI設定が未完了です。.env の HATENA_USER_ID / "
                "HATENA_BLOG_DOMAIN / HATENA_API_KEY を埋めてください。"
            )

    @property
    def collection_url(self) -> str:
        return (
            f"https://blog.hatena.ne.jp/{self.settings.hatena_user_id}/"
            f"{self.settings.hatena_blog_domain}/atom/entry"
        )

    @property
    def auth(self) -> HTTPBasicAuth:
        return HTTPBasicAuth(self.settings.hatena_user_id, self.settings.hatena_api_key)

    def verify(self) -> str:
        """サービスドキュメントを取得して疎通確認."""
        url = (
            f"https://blog.hatena.ne.jp/{self.settings.hatena_user_id}/"
            f"{self.settings.hatena_blog_domain}/atom"
        )
        r = requests.get(url, auth=self.auth, timeout=15)
        r.raise_for_status()
        return self.settings.hatena_blog_domain

    def post_entry(
        self,
        title: str,
        body_markdown: str,
        *,
        categories: list[str] | None = None,
        draft: bool = False,
    ) -> dict:
        """はてなブログAtomPubで記事を投稿する.

        本文は Markdown 形式. はてなブログ側で「Markdown」モードに設定されている前提.
        """
        atom_xml = _build_atom_entry(title, body_markdown, categories=categories, draft=draft)
        headers = {"Content-Type": "application/xml; charset=utf-8"}
        r = requests.post(
            self.collection_url,
            data=atom_xml.encode("utf-8"),
            headers=headers,
            auth=self.auth,
            timeout=30,
        )
        r.raise_for_status()

        # 返されたAtomエントリから記事URLを取り出す
        ns = {"atom": HATENA_ATOM_NS, "app": HATENA_APP_NS}
        root = ET.fromstring(r.text)
        url = ""
        for link in root.findall("atom:link", ns):
            if link.get("rel") == "alternate":
                url = link.get("href", "")
                break
        entry_id = root.findtext("atom:id", default="", namespaces=ns)
        return {
            "entry_id": entry_id,
            "url": url,
            "posted_at": datetime.now(timezone.utc).isoformat(),
        }

    def publish_from_file(self, path: Path) -> dict:
        post = json.loads(path.read_text(encoding="utf-8"))
        if post.get("status") != "approved":
            raise ValueError(f"未承認のブログ投稿は送信できません: {path.name}")
        if post.get("type") != "blog":
            raise ValueError(f"ブログ投稿ではありません: {path.name} (type={post.get('type')})")

        result = self.post_entry(
            title=post["title"],
            body_markdown=post["body_markdown"],
            categories=post.get("categories"),
        )
        post["entry"] = result
        post["status"] = "published"
        post["published_at"] = datetime.now(timezone.utc).isoformat()
        return _move_to_published(post, path)


def _build_atom_entry(
    title: str,
    body_markdown: str,
    *,
    categories: list[str] | None,
    draft: bool,
) -> str:
    cat_xml = "".join(f'<category term="{c}" />' for c in (categories or []))
    draft_xml = (
        '<app:control xmlns:app="http://www.w3.org/2007/app">'
        f'<app:draft>{"yes" if draft else "no"}</app:draft>'
        "</app:control>"
    )
    # AtomPub: type="text/x-markdown" で markdown として送る
    return f"""<?xml version="1.0" encoding="utf-8"?>
<entry xmlns="http://www.w3.org/2005/Atom"
       xmlns:app="http://www.w3.org/2007/app">
  <title>{_xml_escape(title)}</title>
  <author><name>{_xml_escape("")}</name></author>
  <content type="text/x-markdown">{_xml_escape(body_markdown)}</content>
  {cat_xml}
  {draft_xml}
</entry>
"""


def _xml_escape(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _move_to_published(post: dict, src_path: Path) -> dict:
    PUBLISHED_DIR.mkdir(parents=True, exist_ok=True)
    new_path = PUBLISHED_DIR / src_path.name
    new_path.write_text(json.dumps(post, ensure_ascii=False, indent=2), encoding="utf-8")
    src_path.unlink()
    return post
