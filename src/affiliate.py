"""楽天アフィリエイト連携。

楽天市場商品検索APIで商品情報(価格、画像、URL)を取得し、
アフィリエイトIDを付与したリンクを生成する。

楽天Webサービス Documentation:
  https://webservice.rakuten.co.jp/documentation/ichiba-item-search
"""

from __future__ import annotations

import urllib.parse
from dataclasses import dataclass

import requests

from src.config import Settings

RAKUTEN_ICHIBA_SEARCH = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601"
DEFAULT_TIMEOUT = 15


@dataclass
class RakutenItem:
    """楽天市場の1商品の情報."""

    name: str
    price: int
    item_url: str            # 楽天市場の商品ページURL (アフィリ未付与)
    affiliate_url: str       # アフィリエイトIDを付与したURL (短縮済み)
    shop_name: str
    image_url: str | None
    review_average: float | None
    review_count: int | None

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "price": self.price,
            "item_url": self.item_url,
            "affiliate_url": self.affiliate_url,
            "shop_name": self.shop_name,
            "image_url": self.image_url,
            "review_average": self.review_average,
            "review_count": self.review_count,
        }


class RakutenClient:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        if not self.settings.has_rakuten():
            raise RuntimeError(
                "楽天APIの認証情報が未設定です。.env の RAKUTEN_APPLICATION_ID と "
                "RAKUTEN_AFFILIATE_ID を埋めてください。"
            )

    def search_top_item(self, query: str, *, sort: str = "-reviewCount") -> RakutenItem | None:
        """検索クエリで楽天市場を検索し、最も評価/レビュー数が多い1件を返す.

        sort:
          "-reviewCount"  : レビュー件数の多い順 (信頼性高い)
          "-reviewAverage": 評価平均の高い順
          "+itemPrice"    : 価格の安い順
        """
        items = self.search(query, hits=5, sort=sort)
        return items[0] if items else None

    def search(
        self,
        query: str,
        *,
        hits: int = 5,
        sort: str = "-reviewCount",
    ) -> list[RakutenItem]:
        params = {
            "applicationId": self.settings.rakuten_application_id,
            "affiliateId": self.settings.rakuten_affiliate_id,
            "keyword": query,
            "hits": min(max(hits, 1), 30),
            "sort": sort,
            "format": "json",
            "formatVersion": "2",
            # 妻アカウント運営なので、過剰にアダルト等が混じらないようジャンル除外も可能
            # "NGKeyword": "アダルト",
        }
        resp = requests.get(RAKUTEN_ICHIBA_SEARCH, params=params, timeout=DEFAULT_TIMEOUT)
        resp.raise_for_status()
        data = resp.json()
        return [self._to_item(it) for it in data.get("Items", [])]

    @staticmethod
    def _to_item(raw: dict) -> RakutenItem:
        # 楽天APIは formatVersion=2 だと dict 直で来る
        images = raw.get("mediumImageUrls") or raw.get("smallImageUrls") or []
        image_url = images[0] if images else None
        # mediumImageUrls は文字列 or {"imageUrl": "..."} のどちらかの可能性
        if isinstance(image_url, dict):
            image_url = image_url.get("imageUrl")
        # affiliateUrl が空なら itemUrl をフォールバック
        affiliate_url = raw.get("affiliateUrl") or raw.get("itemUrl", "")
        return RakutenItem(
            name=raw.get("itemName", ""),
            price=int(raw.get("itemPrice", 0)),
            item_url=raw.get("itemUrl", ""),
            affiliate_url=affiliate_url,
            shop_name=raw.get("shopName", ""),
            image_url=image_url,
            review_average=raw.get("reviewAverage"),
            review_count=raw.get("reviewCount"),
        )


def build_amazon_link(asin_or_search: str, associate_tag: str) -> str:
    """Amazonリンクを生成する簡易版。

    asin_or_search が10文字英数字ならASIN扱い、それ以外は検索URLを返す。
    """
    if len(asin_or_search) == 10 and asin_or_search.isalnum():
        return f"https://www.amazon.co.jp/dp/{asin_or_search}/?tag={associate_tag}"
    q = urllib.parse.quote(asin_or_search)
    return f"https://www.amazon.co.jp/s?k={q}&tag={associate_tag}"
