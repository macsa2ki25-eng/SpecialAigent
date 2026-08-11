"""ポケカブック (pokecabook.com) から優勝・準優勝デッキを拾う。

サイトが WordPress で動いているため、HTML を力技で解析する前に
まず WP REST API (``/wp-json/wp/v2/``) を試す。記事本文が
``content.rendered`` として JSON で取れるので、一覧ページの
レイアウト変更に巻き込まれにくい。

⚠️ 本文中の順位表の作りは実物を見て調整する必要がある。
``python -m src.pokeca.cli inspect --source pokecabook`` を実行すると
生の本文HTMLを ``data/pokeca/_inspect/`` に保存するので、
外れていたらそれを見て下の正規表現を直すこと。
"""

from __future__ import annotations

import re
from datetime import date, datetime

from bs4 import BeautifulSoup, Tag

from src.pokeca import http
from src.pokeca.models import DeckResult

BASE = "https://pokecabook.com"
API = f"{BASE}/wp-json/wp/v2"
CATEGORY_SLUG = "city-league"

SOURCE_NAME = "pokecabook"

HEADING_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6"}
BLOCK_TAGS = HEADING_TAGS | {"div", "p", "section", "article", "table", "ul", "ol"}

PREFECTURES = [
    "北海道", "青森", "岩手", "宮城", "秋田", "山形", "福島", "茨城", "栃木", "群馬",
    "埼玉", "千葉", "東京", "神奈川", "新潟", "富山", "石川", "福井", "山梨", "長野",
    "岐阜", "静岡", "愛知", "三重", "滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山",
    "鳥取", "島根", "岡山", "広島", "山口", "徳島", "香川", "愛媛", "高知", "福岡",
    "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄",
]

LEAGUE_KEYWORDS = {
    "オープン": "オープン",
    "マスター": "マスター",
    "シニア": "シニア",
    "ジュニア": "ジュニア",
}

# 「優勝：ドラパルトex」「準優勝 リザードンex」などを拾う
RANK_LINE = re.compile(
    r"(準優勝|優勝)\s*[:：\|｜/／・\-−–—]*\s*(?P<deck>[^\n\r]{0,40})"
)
# 見出しが店舗名かどうかの判定に使う語
STORE_HINT = re.compile(r"(店|カード|ホビー|ゲーム|トイ|バトロコ|CARD|BOX|WCS|会場)", re.I)
# タイトルから開催日を拾う (「シティリーグ5/6【水】」)
TITLE_DATE = re.compile(r"(?<!\d)(\d{1,2})\s*[/／月]\s*(\d{1,2})")
# 見出し内の日付 (「5月6日(水)」)
HEADING_DATE = re.compile(r"(\d{1,2})\s*[/／月]\s*(\d{1,2})")

# デッキ名から落とすノイズ
DECK_NOISE = re.compile(r"(デッキ|レシピ|一覧|まとめ|はこちら|詳細)\s*$")


def _clean_deck_name(raw: str) -> str:
    text = raw.strip()
    # 全角括弧内のプレイヤー名などは落とす
    text = re.sub(r"[（(【\[].{0,20}?[）)】\]]\s*$", "", text).strip()
    text = re.sub(r"^[:：\|｜/／・\-−–—\s]+", "", text)
    text = DECK_NOISE.sub("", text).strip()
    return text[:40].strip()


def _detect_prefecture(text: str) -> str:
    for pref in PREFECTURES:
        if pref in text:
            return pref
    return ""


def _detect_league(text: str) -> str:
    for keyword, label in LEAGUE_KEYWORDS.items():
        if keyword in text:
            return label
    return ""


def _resolve_date(month: int, day: int, published: date) -> str:
    """月日 + 記事公開日から実際の開催日を決める。

    年末年始をまたぐ記事 (1月に公開された12月開催の記事など) を考慮する。
    """
    year = published.year
    try:
        candidate = date(year, month, day)
    except ValueError:
        return ""
    # 開催日が公開日より30日以上先なら前年の出来事とみなす
    if (candidate - published).days > 30:
        candidate = date(year - 1, month, day)
    return candidate.isoformat()


def extract_date_from_title(title: str, published: date) -> str:
    match = TITLE_DATE.search(title)
    if not match:
        return published.isoformat()
    return _resolve_date(int(match.group(1)), int(match.group(2)), published) or published.isoformat()


class _State:
    """本文を上から読みながら「いまどの店舗の話か」を持ち回るための入れ物。"""

    def __init__(self, default_date: str) -> None:
        self.date = default_date
        self.default_date = default_date
        self.store = ""
        self.prefecture = ""
        self.league = ""

    def update_from_heading(self, text: str, published: date | None) -> None:
        league = _detect_league(text)
        if league:
            self.league = league
        pref = _detect_prefecture(text)

        date_match = HEADING_DATE.search(text)
        if date_match and published:
            resolved = _resolve_date(
                int(date_match.group(1)), int(date_match.group(2)), published
            )
            if resolved:
                self.date = resolved

        # 店舗名らしい見出しなら店舗を切り替える
        if STORE_HINT.search(text) or pref:
            cleaned = re.sub(r"[【\[](.*?)[】\]]", r"\1 ", text).strip()
            cleaned = re.sub(r"(シティリーグ|結果|デッキ|まとめ|ベスト\d+)", "", cleaned)
            cleaned = HEADING_DATE.sub("", cleaned)
            cleaned = re.sub(r"[（(].{0,6}?[）)]", "", cleaned).strip(" 　-–—・|")
            if cleaned:
                self.store = cleaned
        if pref:
            self.prefecture = pref


def _emit(state: _State, rank: int, deck_name: str, source_url: str) -> DeckResult | None:
    deck = _clean_deck_name(deck_name)
    if not deck or not state.store:
        return None
    return DeckResult(
        date=state.date or state.default_date,
        store=state.store,
        rank=rank,
        deck_name=deck,
        prefecture=state.prefecture,
        league=state.league,
        source=SOURCE_NAME,
        source_url=source_url,
    )


def _rank_of(text: str) -> int | None:
    if "準優勝" in text:
        return 2
    if "優勝" in text:
        return 1
    return None


def _parse_table(table: Tag, state: _State, source_url: str) -> list[DeckResult]:
    """順位表テーブルから拾う。

    「優勝 | ドラパルトex」のように順位セルとデッキ名セルが並ぶ形を想定。
    """
    out: list[DeckResult] = []
    for row in table.find_all("tr"):
        cells = [c.get_text(" ", strip=True) for c in row.find_all(["td", "th"])]
        if not cells:
            continue
        rank = None
        rank_index = -1
        for index, cell in enumerate(cells):
            found = _rank_of(cell)
            # 順位セルは短い。長文セルの中の「優勝」は誤検出しやすいので弾く
            if found and len(cell) <= 8:
                rank, rank_index = found, index
                break
        if rank is None or rank > 2:
            continue
        # 順位セルの右隣からデッキ名を探す
        deck_name = ""
        for cell in cells[rank_index + 1 :]:
            if cell:
                deck_name = cell
                break
        if not deck_name:
            continue
        record = _emit(state, rank, deck_name, source_url)
        if record:
            out.append(record)
    return out


def _parse_leaf(node: Tag, state: _State, source_url: str) -> list[DeckResult]:
    """段落・リスト項目など、これ以上分解しない要素から拾う。"""
    text = node.get_text(" ", strip=True)
    if not text or len(text) > 200:
        return []
    rank = _rank_of(text)
    if rank is None:
        return []

    # リンクがあればリンク文字列を優先 (デッキ名がリンクになっている記事が多い)
    link = node.find("a")
    deck_name = ""
    if link:
        link_text = link.get_text(" ", strip=True)
        if link_text and _rank_of(link_text) is None:
            deck_name = link_text
    if not deck_name:
        match = RANK_LINE.search(text)
        if not match:
            return []
        deck_name = match.group("deck")

    record = _emit(state, rank, deck_name, source_url)
    return [record] if record else []


def _walk(node: Tag, state: _State, source_url: str, published: date | None) -> list[DeckResult]:
    out: list[DeckResult] = []
    for child in node.children:
        if not isinstance(child, Tag):
            continue
        name = (child.name or "").lower()

        if name in HEADING_TAGS:
            state.update_from_heading(child.get_text(" ", strip=True), published)
        elif name == "table":
            out.extend(_parse_table(child, state, source_url))
        elif name in ("ul", "ol"):
            # 箇条書きは項目ごとに1件として読む
            for item in child.find_all("li", recursive=False):
                out.extend(_parse_leaf(item, state, source_url))
        elif child.find(list(BLOCK_TAGS)):
            # まだブロック要素を含むので掘り下げる
            out.extend(_walk(child, state, source_url, published))
        else:
            out.extend(_parse_leaf(child, state, source_url))
    return out


def parse_post(
    content_html: str, title: str, source_url: str, published: date
) -> list[DeckResult]:
    """1記事ぶんの本文HTMLから優勝・準優勝を抜き出す。"""
    soup = BeautifulSoup(content_html, "html.parser")
    state = _State(extract_date_from_title(title, published))
    state.league = _detect_league(title)
    records = _walk(soup, state, source_url, published)

    # 同じ枠を二重に拾ってしまった場合の保険
    seen: set[str] = set()
    unique: list[DeckResult] = []
    for record in records:
        if record.slot_id in seen:
            continue
        seen.add(record.slot_id)
        unique.append(record)
    return unique


# ------------------------------------------------------------------
# 取得
# ------------------------------------------------------------------


def _category_id() -> int | None:
    data = http.get_json(f"{API}/categories", params={"slug": CATEGORY_SLUG})
    if isinstance(data, list) and data:
        return data[0].get("id")
    return None


def fetch_posts(limit: int = 20, category_id: int | None = None) -> list[dict]:
    """シティリーグカテゴリの新着記事を WP REST API で取得する。"""
    params: dict = {"per_page": min(limit, 100), "orderby": "date", "order": "desc"}
    resolved = category_id if category_id is not None else _category_id()
    if resolved:
        params["categories"] = resolved
    else:
        # カテゴリが引けなければ検索でしのぐ
        params["search"] = "シティリーグ"
    data = http.get_json(f"{API}/posts", params=params)
    return data if isinstance(data, list) else []


def collect(limit: int = 20) -> list[DeckResult]:
    """新着記事を巡回して優勝・準優勝レコードを返す。"""
    out: list[DeckResult] = []
    for post in fetch_posts(limit=limit):
        title = BeautifulSoup(
            (post.get("title") or {}).get("rendered", ""), "html.parser"
        ).get_text(" ", strip=True)
        content = (post.get("content") or {}).get("rendered", "")
        link = post.get("link") or ""
        try:
            published = datetime.fromisoformat(
                (post.get("date") or "").replace("Z", "")
            ).date()
        except ValueError:
            published = date.today()
        out.extend(parse_post(content, title, link, published))
    return out
