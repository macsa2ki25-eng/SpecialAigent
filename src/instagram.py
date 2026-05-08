"""Instagram Graph API でカルーセル投稿する。

公式ドキュメント:
  https://developers.facebook.com/docs/instagram-api/guides/content-publishing

カルーセル投稿は3ステップ:
  1. 各画像ごとに container を作成 (is_carousel_item=true)
  2. 全 container_id を子要素にして親 container を作成 (media_type=CAROUSEL)
  3. 親 container を publish

画像は **公開URL** が必要 (直接アップロード不可)。
本実装では2方式をサポート:
  - github_raw : 生成画像をリポジトリにcommitして raw.githubusercontent.com を使う
  - imgbb     : imgbb.com の無料APIを使う (private repo の場合)
"""

from __future__ import annotations

import base64
import time
from pathlib import Path
from urllib.parse import quote

import requests

from src.config import Settings

GRAPH_API_VERSION = "v23.0"
GRAPH_API_BASE = f"https://graph.facebook.com/{GRAPH_API_VERSION}"


class InstagramPublisher:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        if not self.settings.has_instagram():
            raise RuntimeError(
                "Instagram の認証情報が未設定です。.env の "
                "INSTAGRAM_BUSINESS_ID と INSTAGRAM_ACCESS_TOKEN を設定してください。"
            )

    # ---------- 疎通 ----------

    def verify(self) -> str:
        """ビジネスアカウント情報を取得して疎通確認."""
        url = f"{GRAPH_API_BASE}/{self.settings.instagram_business_id}"
        r = requests.get(
            url,
            params={
                "fields": "id,username,name",
                "access_token": self.settings.instagram_access_token,
            },
            timeout=15,
        )
        r.raise_for_status()
        data = r.json()
        return data.get("username", data.get("id", "unknown"))

    # ---------- メインフロー ----------

    def post_carousel(
        self,
        image_urls: list[str],
        caption: str,
    ) -> dict:
        """カルーセル投稿を実行 (3ステップ)."""
        if len(image_urls) < 2 or len(image_urls) > 10:
            raise ValueError(f"カルーセルは2〜10枚の画像が必要です (今回: {len(image_urls)})")

        # Step 1: 各画像のcontainerを作成
        children_ids = []
        for url in image_urls:
            cid = self._create_image_container(url)
            children_ids.append(cid)

        # Step 2: 親 carousel container を作成
        parent_id = self._create_carousel_container(children_ids, caption)

        # Step 3: publish
        # FBはcontainer処理に時間がかかる場合があるため、軽くウェイト
        time.sleep(3)
        result = self._publish(parent_id)
        return {
            "media_id": result.get("id"),
            "url": f"https://www.instagram.com/p/{result.get('id', '')}/",
            "container_id": parent_id,
        }

    # ---------- API 呼び出し ----------

    def _create_image_container(self, image_url: str) -> str:
        url = f"{GRAPH_API_BASE}/{self.settings.instagram_business_id}/media"
        r = requests.post(
            url,
            params={
                "image_url": image_url,
                "is_carousel_item": "true",
                "access_token": self.settings.instagram_access_token,
            },
            timeout=30,
        )
        r.raise_for_status()
        return r.json()["id"]

    def _create_carousel_container(self, children_ids: list[str], caption: str) -> str:
        url = f"{GRAPH_API_BASE}/{self.settings.instagram_business_id}/media"
        r = requests.post(
            url,
            params={
                "media_type": "CAROUSEL",
                "children": ",".join(children_ids),
                "caption": caption,
                "access_token": self.settings.instagram_access_token,
            },
            timeout=30,
        )
        r.raise_for_status()
        return r.json()["id"]

    def _publish(self, container_id: str) -> dict:
        url = f"{GRAPH_API_BASE}/{self.settings.instagram_business_id}/media_publish"
        r = requests.post(
            url,
            params={
                "creation_id": container_id,
                "access_token": self.settings.instagram_access_token,
            },
            timeout=30,
        )
        r.raise_for_status()
        return r.json()


# ============================================================
# 画像ホスティング (公開URLを得る)
# ============================================================


class ImageHost:
    """ローカル画像 → 公開URL に変換するインターフェース."""

    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()

    def upload(self, paths: list[Path]) -> list[str]:
        method = self.settings.image_hosting
        if method == "imgbb":
            return [self._upload_imgbb(p) for p in paths]
        elif method == "github_raw":
            return [self._upload_github_raw(p) for p in paths]
        else:
            raise RuntimeError(f"未対応のIMAGE_HOSTING: {method}")

    def _upload_github_raw(self, path: Path) -> str:
        """画像はリポジトリ内にあり、raw.githubusercontent.com経由で公開URLが取れる前提.

        commit と push は呼び出し側 (CLI / GitHub Actions) で行う。
        ここではURLの組み立てだけ。
        """
        rel = path.resolve().relative_to(self.settings.__class__.__module__ and Path.cwd().parent)
        # 上の relative_to は壊れる可能性があるので、
        # シンプルに path 内の "data/instagram_images/..." を取り出す方式にフォールバック
        rel_str = str(path).replace("\\", "/")
        # data/ 以降を抽出
        marker = "/data/instagram_images/"
        idx = rel_str.find(marker)
        if idx == -1:
            # 想定外ロケーション; ファイル名のみで構築 (動かないかも)
            tail = f"data/instagram_images/{path.name}"
        else:
            tail = "data/instagram_images/" + rel_str[idx + len(marker):]
        return (
            f"https://raw.githubusercontent.com/"
            f"{self.settings.github_repo_owner}/{self.settings.github_repo_name}/"
            f"{quote(self.settings.github_repo_branch, safe='/')}/{tail}"
        )

    def _upload_imgbb(self, path: Path) -> str:
        """imgbb の無料APIにアップロード."""
        if not self.settings.imgbb_api_key:
            raise RuntimeError("IMGBB_API_KEY が未設定です。")
        with path.open("rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        r = requests.post(
            "https://api.imgbb.com/1/upload",
            data={"key": self.settings.imgbb_api_key, "image": b64},
            timeout=60,
        )
        r.raise_for_status()
        return r.json()["data"]["url"]
