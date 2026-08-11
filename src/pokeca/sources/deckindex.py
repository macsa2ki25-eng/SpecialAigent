"""ポケカブックの「デッキ別ページ」から、デッキ名付きの結果を拾う。

シティリーグのまとめ記事にはデッキ名が無い (デッキは画像で示される) が、
デッキ別ページ (例:「ポケカ【ドラパルトex】優勝デッキレシピまとめ」) は
**デッキ名ごとに** 結果が集められているので、そこから名前を取れる。

実物の構造 (archives/122503 で確認済み):

    <div class="entry-content">
      <h2>ストームエメラルダ環境</h2>
      <figure class="wp-block-image">
        <img alt="【ドラパルトex】ジムバトル優勝デッキレシピ" src=".../image-132.png">
        <figcaption>
          <a href="https://www.pokemon-card.com/deck/result.html/deckID/cxxGxa-71MIig-J8cY8c/">
            8/9【日】ジムバトル優勝
          </a>
        </figcaption>
      </figure>
      ... 同じ形が数百件続く
    </div>

つまり1つの figure から次の3つが同時に取れる。

- デッキ名   : img の alt にある【…】
- 開催日と種別: figcaption の「8/9【日】ジムバトル優勝」
- デッキコード: figcaption のリンク先

このモジュールの成果物は2つある。

1. **ジムバトルの優勝レコード** そのもの (店舗名は載っていないので空)
2. **デッキコード → デッキ名の対応表**。シティリーグ側で拾ったコードと
   突き合わせれば、名前の無いレコードに名前を付けられる

なお、ポケカブックがジムバトルについて公開しているのは優勝のみで、
準優勝は掲載されていない (実物ページの324件すべてが「ジムバトル優勝」)。
"""

from __future__ import annotations

import re
from datetime import date, datetime

from bs4 import BeautifulSoup

from src.pokeca import http
from src.pokeca.models import EVENT_CITY, EVENT_GYM, DeckResult

BASE = "https://pokecabook.com"
API = f"{BASE}/wp-json/wp/v2"
CATEGORY_SLUG = "deck-recipe"
CATALOG_URL = f"{BASE}/archives/1417"

SOURCE_NAME = "deckindex"

# 「8/9【日】ジムバトル優勝」「12/28【土】シティリーグ準優勝」
CAPTION_RE = re.compile(
    r"^(?P<month>\d{1,2})\s*/\s*(?P<day>\d{1,2})\s*【.】\s*"
    r"(?P<event>ジムバトル|シティリーグ)?\s*(?P<rank>準優勝|優勝)"
)
# デッキコードは confirm.html / result.html どちらの形でも出てくる
DECK_CODE_RE = re.compile(r"/deck/(?:confirm|result)\.html/deckID/([A-Za-z0-9\-]+)")
# 「【ドラパルトex】ジムバトル優勝デッキレシピ」「ポケカ【ドラパルトex】優勝…」
BRACKET_NAME_RE = re.compile(r"【([^】]+)】")

RANK_BY_LABEL = {"優勝": 1, "準優勝": 2}
EVENT_BY_LABEL = {"ジムバトル": EVENT_GYM, "シティリーグ": EVENT_CITY}

# カタログに混ざっている、デッキ別ページではない記事
CATALOG_SKIP = re.compile(r"(まとめ|一覧|ランキング|環境|結果)$")


def _resolve_date(month: int, day: int, reference: date) -> str:
    """月日 + 基準日から実際の開催日を決める。

    デッキ別ページは数ヶ月ぶんの結果が1ページに並ぶため、
    年をまたぐと 12月の結果に翌年を付けてしまう。基準日より
    30日以上先になる場合は前年とみなす。
    """
    try:
        candidate = date(reference.year, month, day)
    except ValueError:
        return ""
    if (candidate - reference).days > 30:
        try:
            candidate = date(reference.year - 1, month, day)
        except ValueError:
            return ""
    return candidate.isoformat()


def extract_deck_name(title: str) -> str:
    """記事タイトルからデッキ名を取り出す。

    「ポケカ【ドラパルトex】優勝デッキレシピまとめ」→「ドラパルトex」
    """
    match = BRACKET_NAME_RE.search(title or "")
    return match.group(1).strip() if match else ""


def parse_catalog(html: str) -> list[tuple[str, str]]:
    """デッキ一覧ページから (デッキ名, 記事URL) を取り出す。"""
    soup = BeautifulSoup(html, "html.parser")
    content = soup.select_one(".entry-content") or soup
    out: list[tuple[str, str]] = []
    seen: set[str] = set()
    for link in content.find_all("a", href=re.compile(r"/archives/\d+")):
        name = link.get_text(" ", strip=True)
        href = link["href"]
        # リンク文字列が空のもの (サムネイルだけのリンク) や、
        # デッキ名ではないまとめ記事は除く
        if not name or CATALOG_SKIP.search(name) or href in seen:
            continue
        seen.add(href)
        out.append((name, href))
    return out


def parse_deck_page(
    content_html: str, title: str, source_url: str, reference: date
) -> list[DeckResult]:
    """デッキ別ページ1枚から結果レコードを取り出す。"""
    soup = BeautifulSoup(content_html, "html.parser")
    content = soup.select_one(".entry-content") or soup

    fallback_name = extract_deck_name(title)
    records: list[DeckResult] = []

    for figure in content.find_all("figure", class_="wp-block-image"):
        caption = figure.find("figcaption")
        if not caption:
            continue
        match = CAPTION_RE.match(caption.get_text(" ", strip=True))
        if not match:
            # 「デッキレシピ平均化」「エーススペック採用率」など、
            # 大会結果ではない図は飛ばす
            continue

        link = caption.find("a", href=True)
        code_match = DECK_CODE_RE.search(link["href"]) if link else None
        if not code_match:
            continue

        held = _resolve_date(int(match.group("month")), int(match.group("day")), reference)
        if not held:
            continue

        image = figure.find("img")
        deck_name = extract_deck_name(image.get("alt", "")) if image else ""

        records.append(
            DeckResult(
                date=held,
                store="",  # デッキ別ページに店舗名は載っていない
                rank=RANK_BY_LABEL[match.group("rank")],
                deck_name=deck_name or fallback_name,
                event_type=EVENT_BY_LABEL.get(match.group("event") or "", EVENT_GYM),
                deck_code=code_match.group(1),
                source=SOURCE_NAME,
                source_url=source_url,
            )
        )

    return records


# ------------------------------------------------------------------
# 取得
# ------------------------------------------------------------------


def _category_id() -> int | None:
    data = http.get_json(f"{API}/categories", params={"slug": CATEGORY_SLUG})
    if isinstance(data, list) and data:
        return data[0].get("id")
    return None


def fetch_deck_posts(limit: int = 80) -> list[dict]:
    """デッキ別記事を WP REST API でまとめて取得する。

    1記事あたり数百件の結果が入っているので、ページを1枚ずつ開くより
    REST API でまとめて取ったほうが相手のサーバーにも優しい。
    """
    category = _category_id()
    posts: list[dict] = []
    page = 1
    while len(posts) < limit:
        params: dict = {
            "per_page": min(limit - len(posts), 20),
            "page": page,
            "orderby": "modified",
            "order": "desc",
        }
        if category:
            params["categories"] = category
        else:
            params["search"] = "優勝デッキレシピ"
        batch = http.get_json(f"{API}/posts", params=params)
        if not isinstance(batch, list) or not batch:
            break
        posts.extend(batch)
        if len(batch) < params["per_page"]:
            break
        page += 1
    return posts[:limit]


def _reference_date(post: dict) -> date:
    """記事の最終更新日を、月日だけの表記を解決する基準にする。"""
    for key in ("modified", "date"):
        raw = post.get(key) or ""
        try:
            return datetime.fromisoformat(raw.replace("Z", "")).date()
        except ValueError:
            continue
    return date.today()


def collect(limit: int = 80) -> list[DeckResult]:
    """デッキ別ページを巡回して、デッキ名付きの結果レコードを返す。"""
    out: list[DeckResult] = []
    for post in fetch_deck_posts(limit=limit):
        title = BeautifulSoup(
            (post.get("title") or {}).get("rendered", ""), "html.parser"
        ).get_text(" ", strip=True)
        content = (post.get("content") or {}).get("rendered", "")
        out.extend(
            parse_deck_page(content, title, post.get("link") or "", _reference_date(post))
        )
    return out


def build_name_index(records: list[DeckResult]) -> dict[str, str]:
    """デッキコード → デッキ名 の対応表を作る。"""
    return {r.deck_code: r.deck_name for r in records if r.deck_code and r.deck_name}
