"""収集結果の保存・読み込み・マージ。

保存先は ``data/pokeca/results.json`` 1ファイル。
シティリーグは1日あたり全国で数十店舗ぶんしか出ないので、
数年ぶん貯めても数MB程度に収まる。DBは不要。
"""

from __future__ import annotations

import json
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

import yaml

from src.pokeca.models import DeckResult, normalize_deck_name

ROOT = Path(__file__).resolve().parent.parent.parent
POKECA_DIR = ROOT / "data" / "pokeca"
RESULTS_FILE = POKECA_DIR / "results.json"
DECK_THEMES_FILE = POKECA_DIR / "deck_themes.yaml"
SITE_DIR = ROOT / "site"

JST = timezone(timedelta(hours=9))


def now_jst() -> datetime:
    return datetime.now(JST)


def load_results(path: Path | None = None) -> list[DeckResult]:
    """保存済みの結果を読み込む。ファイルが無ければ空リスト。"""
    target = path or RESULTS_FILE
    if not target.exists():
        return []
    with target.open(encoding="utf-8") as f:
        data = json.load(f)
    return [DeckResult.from_dict(r) for r in data.get("results", [])]


def save_results(results: list[DeckResult], path: Path | None = None) -> None:
    """日付の新しい順に並べ替えて保存する。"""
    target = path or RESULTS_FILE
    target.parent.mkdir(parents=True, exist_ok=True)
    ordered = sorted(results, key=lambda r: (r.date, r.store_key, r.rank), reverse=True)
    payload = {
        "updated_at": now_jst().isoformat(timespec="seconds"),
        "count": len(ordered),
        "results": [r.to_dict() for r in ordered],
    }
    with target.open("w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")


def merge_results(
    existing: list[DeckResult], incoming: list[DeckResult]
) -> tuple[list[DeckResult], int, int]:
    """既存データに新規データを統合する。

    同じ ``slot_id`` (日付・店舗・リーグ・順位) のレコードは同一の試合結果とみなし、
    空欄を埋める方向だけで更新する。これにより、ポケカブックで拾った結果に
    公式サイト由来のデッキコードを後から足すことができる。

    Returns:
        (統合後のリスト, 新規追加件数, 更新件数)
    """
    by_slot: dict[str, DeckResult] = {r.slot_id: r for r in existing}
    added = 0
    updated = 0

    for record in incoming:
        current = by_slot.get(record.slot_id)
        if current is None:
            # デッキ名かデッキコードのどちらも無いレコードは、どのデッキが
            # 勝ったのか分からず使いようがないので捨てる。
            # (ポケカブック由来のレコードは名前が無くコードだけ、が正常な状態)
            if not record.deck_name and not record.deck_code:
                continue
            by_slot[record.slot_id] = record
            added += 1
            continue

        # 既存レコードの空欄だけを埋める (すでに入っている値は上書きしない)
        changed = False
        for fieldname in ("prefecture", "league", "deck_code", "source_url", "event_url"):
            if not getattr(current, fieldname) and getattr(record, fieldname):
                setattr(current, fieldname, getattr(record, fieldname))
                changed = True

        # ポケカブックの記事にデッキ名は無いので、まずコードだけのレコードが入り、
        # あとからデッキ名が付く。名前は集計キーと連動するので一緒に更新する。
        if not current.deck_name and record.deck_name:
            current.deck_name = record.deck_name
            current.deck_key = record.deck_key
            changed = True

        if changed:
            updated += 1

    return list(by_slot.values()), added, updated


def sanitize_results(results: list[DeckResult]) -> tuple[list[DeckResult], int]:
    """デッキ名として明らかにおかしいものを空にする。

    「8/10(月)」のような日付や「ストームエメラルダ環境」といった弾の名前が
    デッキ名として入ってしまった過去のデータを、実行のたびに直す。
    レコード自体は日付とデッキコードを持っていて使えるので消さない。

    Returns:
        (直したあとのリスト, 直した件数)
    """
    from src.pokeca.sources.deckindex import is_plausible_deck_name

    fixed = 0
    for record in results:
        if record.deck_name and not is_plausible_deck_name(record.deck_name):
            record.deck_name = ""
            record.deck_key = ""
            fixed += 1
    return results, fixed


def prune_results(results: list[DeckResult], keep_days: int = 180) -> list[DeckResult]:
    """古いレコードを落とす。

    ジムバトルは1日あたり数百件出るので、放っておくと results.json が
    際限なく膨らむ。デッキ環境も数ヶ月で入れ替わり、古い結果は
    デッキ作りの参考にならないので、既定で半年ぶんだけ残す。
    keep_days=0 なら何も落とさない。
    """
    if keep_days <= 0 or not results:
        return list(results)

    dates = [r.date for r in results if r.date]
    if not dates:
        return list(results)
    try:
        newest = date.fromisoformat(max(dates))
    except ValueError:
        return list(results)

    cutoff = (newest - timedelta(days=keep_days)).isoformat()
    return [r for r in results if r.date >= cutoff]


def load_deck_themes() -> dict:
    """デッキ名 → 色・絵文字・別名 の対応表を読む。"""
    if not DECK_THEMES_FILE.exists():
        return {"default": {}, "decks": {}, "aliases": {}}
    with DECK_THEMES_FILE.open(encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def apply_aliases(results: list[DeckResult]) -> list[DeckResult]:
    """deck_themes.yaml の aliases に従って表記ゆれを寄せる。"""
    themes = load_deck_themes()
    aliases: dict[str, str] = themes.get("aliases") or {}
    if not aliases:
        return results
    # aliases は「ゆれた表記: 正式なデッキ名」の形で書く
    normalized = {
        normalize_deck_name(variant): canonical for variant, canonical in aliases.items()
    }

    for record in results:
        canonical = normalized.get(record.deck_key)
        if canonical:
            record.deck_name = canonical
            record.deck_key = normalize_deck_name(canonical)
    return results
