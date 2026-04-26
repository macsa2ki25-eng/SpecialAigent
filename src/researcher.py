"""商品 + バズ参考例を統合してプロンプト材料を組み立てる。

ここがコンテンツ生成の「リサーチ」レイヤー:
  - 楽天APIで商品の現実価格・URL・評価を取得
  - 同カテゴリのバズ投稿サンプルを抽出 (few-shot)
  - 後で X検索 / Google Trends も追加可能
"""

from __future__ import annotations

import random
from dataclasses import dataclass, field

from src.affiliate import RakutenClient, RakutenItem
from src.config import Settings, load_buzz_examples


@dataclass
class ResearchBundle:
    """1商品分のリサーチ結果. generator.py に渡す."""

    product: dict                          # data/products.yaml の1エントリそのまま
    rakuten: RakutenItem | None = None     # 楽天APIで引いた商品情報
    buzz_examples: list[dict] = field(default_factory=list)  # 同カテゴリのバズサンプル

    def to_dict(self) -> dict:
        return {
            "product": self.product,
            "rakuten": self.rakuten.to_dict() if self.rakuten else None,
            "buzz_examples": self.buzz_examples,
        }


class Researcher:
    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or Settings.load()
        self._rakuten: RakutenClient | None = None
        self.buzz_examples = load_buzz_examples()

    @property
    def rakuten(self) -> RakutenClient | None:
        if self._rakuten is None and self.settings.has_rakuten():
            self._rakuten = RakutenClient(self.settings)
        return self._rakuten

    def research(self, product: dict, *, max_buzz: int = 3) -> ResearchBundle:
        bundle = ResearchBundle(product=product)

        # 楽天で商品情報を取得（失敗してもフォールバック可能にする）
        if self.rakuten is not None:
            query = product.get("search_query") or product.get("name", "")
            try:
                bundle.rakuten = self.rakuten.search_top_item(query)
            except Exception as e:
                print(f"⚠️  楽天API検索失敗 ({query}): {e}")

        # バズ例: 同カテゴリ優先、足りなければ他カテゴリからランダム補完
        category = product.get("category", "")
        same_cat = [b for b in self.buzz_examples if b.get("category") == category]
        others = [b for b in self.buzz_examples if b.get("category") != category]
        random.shuffle(same_cat)
        random.shuffle(others)
        bundle.buzz_examples = (same_cat + others)[:max_buzz]

        return bundle
