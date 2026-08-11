"""pokeca モジュールのテスト。

``tests/fixtures/pokecabook_city_league.html`` は実際に保存した
pokecabook.com/archives/320777 から先頭2店舗ぶんを抜き出したもの。
img の srcset など容量だけ食う属性を削っただけで、構造は実物のまま。

収集元の構造が変わってパーサーを直すときは、まず
``python -m src.pokeca.cli inspect --source pokecabook`` で新しい実物を保存し、
fixture を差し替えてからコードを直すこと。
"""

from __future__ import annotations

from datetime import date
from pathlib import Path

import pytest

from src.pokeca import aggregate
from src.pokeca.models import DeckResult, normalize_deck_name, normalize_store
from src.pokeca.sources import official, pokecabook
from src.pokeca.store import merge_results

FIXTURE = Path(__file__).parent / "fixtures" / "pokecabook_city_league.html"
POST_URL = "https://pokecabook.com/archives/320777"
POST_TITLE = "シティリーグ5/6【水】ベスト16デッキまとめ"
PUBLISHED = date(2026, 5, 6)


@pytest.fixture(scope="module")
def records() -> list[DeckResult]:
    html = FIXTURE.read_text(encoding="utf-8")
    return pokecabook.parse_post(html, POST_TITLE, POST_URL, PUBLISHED)


# ------------------------------------------------------------------
# 正規化
# ------------------------------------------------------------------


def test_deck_name_normalization_absorbs_variants():
    assert normalize_deck_name("ドラパルトex") == normalize_deck_name("ドラパルトｅｘ")
    assert normalize_deck_name("ドラパルトex デッキ") == normalize_deck_name("ドラパルトex")
    assert normalize_deck_name("リザードンex") != normalize_deck_name("ドラパルトex")


def test_store_normalization_ignores_spacing():
    assert normalize_store("バトロコ 高田馬場") == normalize_store("バトロコ　高田馬場")


@pytest.mark.parametrize(
    "heading,expected",
    [
        ("宝島　岐阜本店（岐阜）", ("宝島 岐阜本店", "岐阜")),
        ("Super KaBoS + GEO 鯖江店（福井）", ("Super KaBoS + GEO 鯖江店", "福井")),
        ("BOOKOFFPLUS　アミューあつぎ店（神奈川）", ("BOOKOFFPLUS アミューあつぎ店", "神奈川")),
        ("バトロコミニ苫小牧バイパス店（北海道）", ("バトロコミニ苫小牧バイパス店", "北海道")),
        ("店舗名だけで括弧なし", ("店舗名だけで括弧なし", "")),
    ],
)
def test_split_store(heading, expected):
    assert pokecabook.split_store(heading) == expected


# ------------------------------------------------------------------
# ポケカブックのパーサー (実物HTMLに対して)
# ------------------------------------------------------------------


def test_parses_only_first_and_second_place(records):
    """TOP4 / TOP8 / TOP16 は拾わない。2店舗ぶん = 4件。"""
    assert len(records) == 4
    assert sorted(r.rank for r in records) == [1, 1, 2, 2]


def test_extracts_store_and_prefecture(records):
    winners = {r.store: r for r in records if r.rank == 1}
    assert set(winners) == {"宝島 岐阜本店", "ゲームアーク 丸亀店"}
    assert winners["宝島 岐阜本店"].prefecture == "岐阜"
    assert winners["ゲームアーク 丸亀店"].prefecture == "香川"


def test_extracts_official_deck_code(records):
    """デッキコードが取れることが最重要。実物の60枚レシピへの導線になる。"""
    first = next(r for r in records if r.rank == 1 and r.store == "宝島 岐阜本店")
    assert first.deck_code == "8YGKY8-wTd9K2-8Dacc4"
    assert first.deck_code_url == (
        "https://www.pokemon-card.com/deck/confirm.html/deckID/8YGKY8-wTd9K2-8Dacc4/"
    )
    assert all(r.deck_code for r in records)


def test_links_back_to_the_store_section_of_the_article(records):
    """<span id="tocN"> を使って元記事の該当店舗へ直接飛べる。"""
    first = next(r for r in records if r.store == "宝島 岐阜本店")
    second = next(r for r in records if r.store == "ゲームアーク 丸亀店")
    assert first.source_url == f"{POST_URL}#toc1"
    assert second.source_url == f"{POST_URL}#toc2"


def test_captures_official_event_url(records):
    """リーグ区分を後から補うために公式イベントURLを持っておく。"""
    first = next(r for r in records if r.store == "宝島 岐阜本店")
    assert first.event_url == "https://players.pokemon-card.com/event/detail/953108/result"


def test_deck_name_is_absent_in_this_source(records):
    """この記事にデッキ名は書かれていない (デッキは画像で示されている)。

    名前は別の情報源から埋める前提。ここが空であること自体が仕様。
    """
    assert all(r.deck_name == "" for r in records)


def test_date_comes_from_the_title(records):
    assert all(r.date == "2026-05-06" for r in records)


def test_each_record_is_a_distinct_slot(records):
    assert len({r.slot_id for r in records}) == len(records)


def test_extract_date_handles_year_boundary():
    """1月公開の記事に 12/28 とあれば前年の開催とみなす。"""
    published = date(2026, 1, 5)
    assert pokecabook.extract_date_from_title("シティリーグ12/28【日】", published) == "2025-12-28"
    assert pokecabook.extract_date_from_title("シティリーグ1/4【日】", published) == "2026-01-04"


def test_parse_post_survives_empty_content():
    assert pokecabook.parse_post("", POST_TITLE, POST_URL, PUBLISHED) == []


# ------------------------------------------------------------------
# 公式サイトのパーサー (リーグ区分の補完用・構造は未検証)
# ------------------------------------------------------------------


def test_official_league_extraction():
    html = "<h1>シティリーグ2026 シーズン3 ジュニアリーグ</h1><p>2026年5月6日</p>"
    assert official.extract_league(html) == "ジュニア"


def test_official_league_extraction_returns_empty_when_unknown():
    assert official.extract_league("<h1>なにかのイベント</h1>") == ""


# ------------------------------------------------------------------
# マージ
# ------------------------------------------------------------------


def _record(**kwargs) -> DeckResult:
    base = dict(
        date="2026-05-06",
        store="バトロコ 高田馬場",
        rank=1,
        deck_name="ドラパルトex",
        league="",
    )
    base.update(kwargs)
    return DeckResult(**base)


def test_merge_fills_in_deck_name_later():
    """デッキコードだけ先に入り、あとから名前が付くのが実際の流れ。"""
    existing = [_record(deck_name="", deck_code="abc-123", source="pokecabook")]
    merged, added, updated = merge_results(
        existing, [_record(deck_name="ドラパルトex", source="deckindex")]
    )
    assert (added, updated) == (0, 1)
    assert merged[0].deck_name == "ドラパルトex"
    assert merged[0].deck_code == "abc-123"


def test_merge_accepts_records_that_only_have_a_deck_code():
    """ポケカブック由来のレコードは名前が無くコードだけ。これが通常の状態。"""
    merged, added, _ = merge_results([], [_record(deck_name="", deck_code="abc-123")])
    assert added == 1
    assert merged[0].deck_code == "abc-123"


def test_merge_rejects_records_with_neither_name_nor_code():
    merged, added, _ = merge_results([], [_record(deck_name="", deck_code="")])
    assert (added, merged) == (0, [])


def test_merge_absorbs_store_spacing_differences():
    existing = [_record(store="バトロコ　高田馬場", source="pokecabook")]
    merged, added, _ = merge_results(existing, [_record(store="バトロコ 高田馬場")])
    assert added == 0
    assert len(merged) == 1


def test_merge_keeps_different_leagues_apart():
    merged, added, _ = merge_results(
        [_record(league="オープン")], [_record(league="ジュニア")]
    )
    assert added == 1
    assert len(merged) == 2


def test_merge_is_idempotent():
    records = [_record(source="pokecabook")]
    once, added1, _ = merge_results([], records)
    twice, added2, _ = merge_results(once, records)
    assert (added1, added2, len(twice)) == (1, 0, 1)


def test_merge_does_not_overwrite_existing_values():
    existing = [_record(deck_name="ドラパルトex", deck_code="keep-me")]
    merged, _, _ = merge_results(existing, [_record(deck_code="new-code")])
    assert merged[0].deck_code == "keep-me"


# ------------------------------------------------------------------
# 集計
# ------------------------------------------------------------------


def test_deck_ranking_orders_by_wins_then_runner_ups():
    results = [
        _record(store="A", rank=1, deck_name="ドラパルトex"),
        _record(store="B", rank=1, deck_name="ドラパルトex"),
        _record(store="C", rank=1, deck_name="リザードンex"),
        _record(store="D", rank=2, deck_name="リザードンex"),
        _record(store="E", rank=2, deck_name="サーナイトex"),
    ]
    ranked = aggregate.deck_ranking(results, days=0)
    assert [e["deck_name"] for e in ranked] == ["ドラパルトex", "リザードンex", "サーナイトex"]
    assert ranked[0]["first"] == 2


def test_deck_ranking_ignores_unnamed_decks():
    """名前が付いていないデッキはランキングに出さない (「」が1位になるのを防ぐ)。"""
    results = [
        _record(store="A", rank=1, deck_name="ドラパルトex"),
        _record(store="B", rank=1, deck_name=""),
        _record(store="C", rank=1, deck_name=""),
    ]
    ranked = aggregate.deck_ranking(results, days=0)
    assert [e["deck_name"] for e in ranked] == ["ドラパルトex"]


def test_deck_ranking_respects_period():
    results = [
        _record(date="2026-05-06", store="A", deck_name="ドラパルトex"),
        _record(date="2026-04-01", store="B", deck_name="リザードンex"),
    ]
    recent = aggregate.deck_ranking(results, days=7, today=date(2026, 5, 6))
    assert [e["deck_name"] for e in recent] == ["ドラパルトex"]
    assert len(aggregate.deck_ranking(results, days=0)) == 2
