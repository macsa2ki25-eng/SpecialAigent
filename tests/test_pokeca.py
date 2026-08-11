"""pokeca モジュールのテスト。

ポイント: 収集元サイトの実物HTMLは開発時に確認できていないため、
「ありそうな書き方」を複数パターン用意してパーサーに食わせている。
実物と食い違っていた場合は、まず
``python -m src.pokeca.cli inspect --source pokecabook`` で本物を保存し、
そのHTMLをここのテストケースに足してから直すこと。
"""

from __future__ import annotations

from datetime import date

from src.pokeca import aggregate
from src.pokeca.models import DeckResult, normalize_deck_name, normalize_store
from src.pokeca.sources import official, pokecabook
from src.pokeca.store import merge_results


# ------------------------------------------------------------------
# 正規化
# ------------------------------------------------------------------


def test_deck_name_normalization_absorbs_variants():
    assert normalize_deck_name("ドラパルトex") == normalize_deck_name("ドラパルトｅｘ")
    assert normalize_deck_name("ドラパルトex デッキ") == normalize_deck_name("ドラパルトex")
    assert normalize_deck_name("リザードンex") != normalize_deck_name("ドラパルトex")


def test_store_normalization_ignores_spacing():
    assert normalize_store("バトロコ 高田馬場") == normalize_store("バトロコ高田馬場")
    assert normalize_store("【東京】バトロコ高田馬場") == "東京バトロコ高田馬場"


# ------------------------------------------------------------------
# ポケカブックのパーサー
# ------------------------------------------------------------------

PUBLISHED = date(2026, 5, 6)


def test_parse_post_table_layout():
    """順位表がテーブルになっている場合。"""
    html = """
    <h2>【東京】バトロコ高田馬場</h2>
    <table>
      <tr><th>順位</th><th>デッキ</th></tr>
      <tr><td>優勝</td><td><a href="/x">ドラパルトex</a></td></tr>
      <tr><td>準優勝</td><td>リザードンex</td></tr>
      <tr><td>ベスト4</td><td>サーナイトex</td></tr>
    </table>
    """
    records = pokecabook.parse_post(
        html, "シティリーグ5/6【水】ベスト16デッキまとめ", "https://example.test/1", PUBLISHED
    )
    assert len(records) == 2
    assert records[0].rank == 1
    assert records[0].deck_name == "ドラパルトex"
    assert records[0].store == "東京 バトロコ高田馬場"
    assert records[0].prefecture == "東京"
    assert records[0].date == "2026-05-06"
    assert records[1].rank == 2
    assert records[1].deck_name == "リザードンex"


def test_parse_post_paragraph_layout():
    """「優勝：デッキ名」と段落で書かれている場合。"""
    html = """
    <h3>宝島 岐阜本店</h3>
    <p>優勝：パオジアンex</p>
    <p>準優勝：ミライドンex</p>
    <p>ベスト4：ロストバレット</p>
    """
    records = pokecabook.parse_post(
        html, "シティリーグ5/6【水】", "https://example.test/2", PUBLISHED
    )
    assert [(r.rank, r.deck_name) for r in records] == [
        (1, "パオジアンex"),
        (2, "ミライドンex"),
    ]
    assert records[0].store == "宝島 岐阜本店"


def test_parse_post_list_layout_multiple_stores():
    """箇条書き + 複数店舗が1記事に並んでいる場合。"""
    html = """
    <h2>ゲームアーク 丸亀店</h2>
    <ul>
      <li>優勝 タケルライコex</li>
      <li>準優勝 ドラパルトex</li>
    </ul>
    <h2>カードボックス 福山店</h2>
    <ul>
      <li>優勝 サーナイトex</li>
      <li>準優勝 ピジョットex</li>
    </ul>
    """
    records = pokecabook.parse_post(
        html, "シティリーグ5/6【水】", "https://example.test/3", PUBLISHED
    )
    assert len(records) == 4
    stores = {r.store for r in records}
    assert stores == {"ゲームアーク 丸亀店", "カードボックス 福山店"}
    winners = {r.store: r.deck_name for r in records if r.rank == 1}
    assert winners["ゲームアーク 丸亀店"] == "タケルライコex"
    assert winners["カードボックス 福山店"] == "サーナイトex"


def test_parse_post_detects_league_from_heading():
    html = """
    <h2>バトロコ高田馬場 ジュニアリーグ</h2>
    <p>優勝：リザードンex</p>
    """
    records = pokecabook.parse_post(
        html, "シティリーグ5/6【水】", "https://example.test/4", PUBLISHED
    )
    assert records[0].league == "ジュニア"


def test_parse_post_ignores_rank_beyond_second():
    html = """
    <h2>宝島 岐阜本店</h2>
    <p>ベスト4：ロストバレット</p>
    <p>ベスト8：リザードンex</p>
    """
    records = pokecabook.parse_post(
        html, "シティリーグ5/6【水】", "https://example.test/5", PUBLISHED
    )
    assert records == []


def test_parse_post_skips_records_without_store():
    """店舗が特定できないうちに出てきた順位は捨てる (誤集計を防ぐ)。"""
    html = "<p>優勝：ドラパルトex</p>"
    records = pokecabook.parse_post(
        html, "シティリーグ5/6【水】", "https://example.test/6", PUBLISHED
    )
    assert records == []


def test_extract_date_handles_year_boundary():
    """1月公開の記事に 12/28 とあれば前年の開催とみなす。"""
    published = date(2026, 1, 5)
    assert (
        pokecabook.extract_date_from_title("シティリーグ12/28【日】", published)
        == "2025-12-28"
    )
    assert (
        pokecabook.extract_date_from_title("シティリーグ1/4【日】", published)
        == "2026-01-04"
    )


# ------------------------------------------------------------------
# 公式サイトのパーサー
# ------------------------------------------------------------------


def test_parse_event_page_extracts_deck_codes():
    html = """
    <h1>シティリーグ2026 シーズン3 オープンリーグ</h1>
    <p>2026年5月6日 バトロコ高田馬場</p>
    <table>
      <tr><td>1位</td><td>プレイヤーA</td>
          <td><a href="https://www.pokemon-card.com/deck/confirm.html/deckID/abcDEF-123xyz/">デッキ</a></td></tr>
      <tr><td>2位</td><td>プレイヤーB</td>
          <td><a href="https://www.pokemon-card.com/deck/confirm.html/deckID/zzz999-000aaa/">デッキ</a></td></tr>
      <tr><td>3位</td><td>プレイヤーC</td><td>-</td></tr>
    </table>
    """
    records = official.parse_event_page(html, "https://players.pokemon-card.com/event/detail/1/result")
    assert len(records) == 2
    assert records[0].rank == 1
    assert records[0].deck_code == "abcDEF-123xyz"
    assert records[0].date == "2026-05-06"
    assert records[0].league == "オープン"
    assert records[0].deck_name == ""  # 公式にデッキ名は無い
    assert records[0].deck_code_url.endswith("/deckID/abcDEF-123xyz/")


# ------------------------------------------------------------------
# マージ
# ------------------------------------------------------------------


def _record(**kwargs) -> DeckResult:
    base = dict(
        date="2026-05-06",
        store="バトロコ高田馬場",
        rank=1,
        deck_name="ドラパルトex",
        league="オープン",
    )
    base.update(kwargs)
    return DeckResult(**base)


def test_merge_enriches_existing_record_with_deck_code():
    existing = [_record(source="pokecabook", source_url="https://pokecabook.test/1")]
    incoming = [
        _record(
            deck_name="",
            deck_code="abc-123",
            source="official",
            store="バトロコ 高田馬場",  # 表記ゆれがあっても同じ枠として扱う
        )
    ]
    merged, added, updated = merge_results(existing, incoming)
    assert added == 0
    assert updated == 1
    assert len(merged) == 1
    assert merged[0].deck_code == "abc-123"
    assert merged[0].deck_name == "ドラパルトex"  # デッキ名は消えない


def test_merge_does_not_create_records_without_deck_name():
    merged, added, updated = merge_results([], [_record(deck_name="", deck_code="x-1")])
    assert (added, updated, merged) == (0, 0, [])


def test_merge_keeps_different_leagues_apart():
    existing = [_record(league="オープン")]
    incoming = [_record(league="ジュニア", deck_name="リザードンex")]
    merged, added, _ = merge_results(existing, incoming)
    assert added == 1
    assert len(merged) == 2


def test_merge_is_idempotent():
    records = [_record(source="pokecabook")]
    once, added1, _ = merge_results([], records)
    twice, added2, _ = merge_results(once, records)
    assert added1 == 1
    assert added2 == 0
    assert len(twice) == 1


# ------------------------------------------------------------------
# 集計
# ------------------------------------------------------------------


def test_deck_ranking_orders_by_wins_then_runner_ups():
    results = [
        _record(date="2026-05-06", store="A", rank=1, deck_name="ドラパルトex"),
        _record(date="2026-05-06", store="B", rank=1, deck_name="ドラパルトex"),
        _record(date="2026-05-06", store="C", rank=1, deck_name="リザードンex"),
        _record(date="2026-05-06", store="D", rank=2, deck_name="リザードンex"),
        _record(date="2026-05-06", store="E", rank=2, deck_name="サーナイトex"),
    ]
    ranked = aggregate.deck_ranking(results, days=0)
    assert [e["deck_name"] for e in ranked] == ["ドラパルトex", "リザードンex", "サーナイトex"]
    assert ranked[0]["first"] == 2
    assert ranked[1]["first"] == 1 and ranked[1]["second"] == 1


def test_deck_ranking_respects_period():
    results = [
        _record(date="2026-05-06", store="A", deck_name="ドラパルトex"),
        _record(date="2026-04-01", store="B", deck_name="リザードンex"),
    ]
    recent = aggregate.deck_ranking(results, days=7, today=date(2026, 5, 6))
    assert [e["deck_name"] for e in recent] == ["ドラパルトex"]
    everything = aggregate.deck_ranking(results, days=0)
    assert len(everything) == 2
