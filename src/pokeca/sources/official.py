"""公式プレイヤーズクラブ (players.pokemon-card.com) から一次情報を拾う。

このソースの役割は「デッキ名を知ること」ではなく、
**デッキコードを取ってくること**。公式のイベント結果ページには
デッキコードが載っており、そこから実物の60枚レシピを開ける。

    https://www.pokemon-card.com/deck/confirm.html/deckID/<コード>/

デッキ名 (「ドラパルトex」など) は公式では付けられていないので、
デッキ名はポケカブック側から、デッキコードは公式側から取って
``slot_id`` (日付・店舗・リーグ・順位) で突き合わせる設計にしている。

⚠️ 公式サイトのページ構造は未検証。JavaScript描画だった場合はこの実装では
取れないので、``python -m src.pokeca.cli inspect --source official`` で
実際のHTMLを保存して確認すること。
"""

from __future__ import annotations

import re
from datetime import date

from bs4 import BeautifulSoup

from src.pokeca import http
from src.pokeca.models import DeckResult

BASE = "https://players.pokemon-card.com"
RESULT_LIST = f"{BASE}/event/result/list"

SOURCE_NAME = "official"

EVENT_LINK = re.compile(r"/event/detail/(\d+)/result")
DECK_CODE_LINK = re.compile(
    r"pokemon-card\.com/deck/confirm\.html/deckID/([A-Za-z0-9\-]+)"
)
RANK_CELL = re.compile(r"^\s*(\d{1,3})\s*位\s*$")
DATE_TEXT = re.compile(r"(\d{4})[/年\-.](\d{1,2})[/月\-.](\d{1,2})")

LEAGUE_WORDS = ("オープン", "マスター", "シニア", "ジュニア")


def event_url(event_id: str | int) -> str:
    return f"{BASE}/event/detail/{event_id}/result"


def fetch_event_ids(limit: int = 40) -> list[str]:
    """イベント結果一覧からイベントIDを集める。"""
    html = http.get_text(RESULT_LIST)
    ids: list[str] = []
    for match in EVENT_LINK.finditer(html):
        event_id = match.group(1)
        if event_id not in ids:
            ids.append(event_id)
        if len(ids) >= limit:
            break
    return ids


def _text_of(soup: BeautifulSoup, *selectors: str) -> str:
    for selector in selectors:
        node = soup.select_one(selector)
        if node:
            text = node.get_text(" ", strip=True)
            if text:
                return text
    return ""


def parse_event_page(html: str, url: str) -> list[DeckResult]:
    """イベント結果ページから優勝・準優勝のデッキコードを拾う。"""
    soup = BeautifulSoup(html, "html.parser")
    page_text = soup.get_text(" ", strip=True)

    title = _text_of(soup, "h1", ".eventTitle", "title")
    league = next((w for w in LEAGUE_WORDS if w in title or w in page_text[:600]), "")

    date_match = DATE_TEXT.search(page_text[:1200])
    if date_match:
        try:
            held = date(
                int(date_match.group(1)),
                int(date_match.group(2)),
                int(date_match.group(3)),
            ).isoformat()
        except ValueError:
            held = ""
    else:
        held = ""

    store = _text_of(soup, ".eventShop", ".shopName", ".event-shop", ".event-place")
    if not store:
        # 「5月6日 バトロコ高田馬場」のように日付の直後に会場名が来る形を拾う。
        # 「◯◯店」で終わらない店名 (バトロコ高田馬場など) も多いので、
        # 店の字を必須にしないこと。
        after_date = re.search(
            r"\d{1,2}\s*[日/][（(]?[月火水木金土日]?[）)]?\s*([^\s　]{2,24})",
            page_text[:1200],
        )
        if after_date:
            store = after_date.group(1)
    if not store:
        shop_match = re.search(r"([^\s　]{2,20}店)", page_text[:1200])
        store = shop_match.group(1) if shop_match else ""
    store = store.strip(" 　-–—|・")

    out: list[DeckResult] = []
    for row in soup.find_all("tr"):
        cells = row.find_all(["td", "th"])
        if not cells:
            continue
        rank = None
        for cell in cells:
            match = RANK_CELL.match(cell.get_text(" ", strip=True))
            if match:
                rank = int(match.group(1))
                break
        if rank not in (1, 2):
            continue

        code = ""
        code_match = DECK_CODE_LINK.search(str(row))
        if code_match:
            code = code_match.group(1)

        if not held or not store:
            continue

        out.append(
            DeckResult(
                date=held,
                store=store,
                rank=rank,
                deck_name="",  # 公式にデッキ名は無い。ポケカブック側とマージして埋める
                league=league,
                deck_code=code,
                source=SOURCE_NAME,
                source_url=url,
            )
        )
    return out


def collect(limit: int = 40) -> list[DeckResult]:
    """新着イベントを巡回してデッキコード付きレコードを返す。"""
    out: list[DeckResult] = []
    for event_id in fetch_event_ids(limit=limit):
        url = event_url(event_id)
        try:
            html = http.get_text(url)
        except Exception:
            continue
        out.extend(parse_event_page(html, url))
    return out
