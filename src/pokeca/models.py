"""シティリーグ結果の共通データモデル。

収集元 (ポケカブック / 公式プレイヤーズクラブ) が違っても、最終的にこの
``DeckResult`` に正規化してから ``data/pokeca/results.json`` に貯める。

著作権に配慮し、保存するのは「事実データ + 元記事へのリンク」だけにする。
デッキレシピ画像や記事本文は転載せず、詳細は必ず元サイトへ誘導すること。
プレイヤー名も保存しない (子ども向けページを公開する可能性があるため)。
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import asdict, dataclass, field

# 集計対象にする順位。優勝と準優勝だけを追いかける。
RANK_LABELS = {1: "優勝", 2: "準優勝"}

# ふりがな付きの子ども向けラベル
RANK_LABELS_KIDS = {1: "ゆうしょう", 2: "じゅんゆうしょう"}


def normalize_text(value: str) -> str:
    """全角/半角のゆらぎを吸収して比較しやすい形にする。"""
    if not value:
        return ""
    text = unicodedata.normalize("NFKC", value)
    text = text.replace("　", " ")
    return re.sub(r"\s+", " ", text).strip()


def normalize_store(value: str) -> str:
    """店舗名の表記ゆれを吸収する (「バトロコ 高田馬場」→「バトロコ高田馬場」)。"""
    text = normalize_text(value)
    # 装飾記号と空白を落として突き合わせキーにする
    text = re.sub(r"[\[\]【】()（）]", "", text)
    return text.replace(" ", "")


def normalize_deck_name(value: str) -> str:
    """デッキ名を集計キーに正規化する。

    「ドラパルトex デッキ」「ドラパルトｅｘ」などを同一視するための処理。
    表記ゆれの統合はこれだけでは足りないので、どうしても割れる場合は
    ``data/pokeca/deck_themes.yaml`` の ``aliases`` で明示的に寄せる。
    """
    text = normalize_text(value).lower()
    text = re.sub(r"[\[\]【】()（）]", "", text)
    text = re.sub(r"(デッキ|でっき|レシピ)$", "", text)
    return text.replace(" ", "").strip()


@dataclass
class DeckResult:
    """1店舗・1リーグ・1順位ぶんの結果。"""

    date: str  # 開催日 "2026-05-06"
    store: str  # 店舗名 (表示用の原文)
    rank: int  # 1 = 優勝, 2 = 準優勝
    deck_name: str  # デッキ名 (表示用の原文)
    prefecture: str = ""  # 都道府県 (取れれば)
    league: str = ""  # オープン / シニア / ジュニア
    deck_code: str = ""  # 公式デッキコード (取れれば)
    source: str = ""  # pokecabook / official
    source_url: str = ""  # 元記事・元ページURL
    collected_at: str = ""  # 収集時刻 (JST ISO8601)

    # 集計用の正規化キー (保存はするが表示には使わない)
    deck_key: str = field(default="")
    store_key: str = field(default="")

    def __post_init__(self) -> None:
        if not self.deck_key:
            self.deck_key = normalize_deck_name(self.deck_name)
        if not self.store_key:
            self.store_key = normalize_store(self.store)

    @property
    def slot_id(self) -> str:
        """同じ「枠」を指す一意キー。

        日付・店舗・リーグ・順位が同じなら、収集元が違っても同じ試合結果。
        ポケカブック由来のレコードに、公式由来のデッキコードを後から
        マージするためにこのキーを使う。
        """
        return f"{self.date}|{self.store_key}|{self.league}|{self.rank}"

    @property
    def rank_label(self) -> str:
        return RANK_LABELS.get(self.rank, f"{self.rank}位")

    @property
    def deck_code_url(self) -> str:
        """デッキコードから公式のレシピ表示ページURLを組み立てる。"""
        if not self.deck_code:
            return ""
        return f"https://www.pokemon-card.com/deck/confirm.html/deckID/{self.deck_code}/"

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict) -> "DeckResult":
        known = {f for f in cls.__dataclass_fields__}
        return cls(**{k: v for k, v in data.items() if k in known})
