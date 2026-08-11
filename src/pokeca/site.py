"""子ども向けの静的ページを生成する。

設計方針 (8歳が一人で使えること):

- 文字入力を一切させない。操作は大きなボタンのタップだけ
- UIの文言はひらがな。日付も「5がつ6にち」形式にする
- デッキ名はカタカナが多くそのまま読めるので、文字を大きくして主役にする
- レシピ画像や記事本文は転載しない。タップしたら元サイトを開く
- 1ファイル完結。JSもCSSもデータも全部埋め込むのでオフラインでも開ける
"""

from __future__ import annotations

import hashlib
import json
from datetime import date

from src.pokeca import aggregate
from src.pokeca.models import DeckResult
from src.pokeca.store import load_deck_themes, now_jst

# デッキ名が deck_themes.yaml に無いときに使う色。
# デッキ名のハッシュから決めるので、同じデッキは常に同じ色になる。
FALLBACK_COLORS = [
    "#E63946", "#F77F00", "#FCBF49", "#06D6A0", "#118AB2",
    "#7209B7", "#EF476F", "#2A9D8F", "#E76F51", "#4361EE",
]
FALLBACK_EMOJI = "⚡"


def _theme_for(deck_key: str, deck_name: str, themes: dict) -> dict:
    decks = themes.get("decks") or {}
    entry = decks.get(deck_name) or decks.get(deck_key) or {}
    digest = hashlib.md5(deck_key.encode("utf-8")).hexdigest()
    color = entry.get("color") or FALLBACK_COLORS[int(digest, 16) % len(FALLBACK_COLORS)]
    return {"color": color, "emoji": entry.get("emoji") or FALLBACK_EMOJI}


def _date_label(value: str) -> str:
    """"2026-05-06" → "5がつ6にち"。"""
    try:
        parsed = date.fromisoformat(value)
    except (ValueError, TypeError):
        return value or ""
    return f"{parsed.month}がつ{parsed.day}にち"


def build_data(results: list[DeckResult], *, is_sample: bool = False) -> dict:
    """ページに埋め込む JSON を組み立てる。"""
    themes = load_deck_themes()

    rows = []
    for record in sorted(
        results, key=lambda r: (r.date, r.rank, r.store_key), reverse=True
    ):
        theme = _theme_for(record.deck_key, record.deck_name, themes)
        rows.append(
            {
                "date": record.date,
                "dateLabel": _date_label(record.date),
                "store": record.store,
                "prefecture": record.prefecture,
                "league": record.league,
                "rank": record.rank,
                "deck": record.deck_name,
                "deckKey": record.deck_key,
                # レシピは公式デッキコードを最優先、無ければ元記事へ
                "recipeUrl": record.deck_code_url or record.source_url,
                "hasCode": bool(record.deck_code),
                "color": theme["color"],
                "emoji": theme["emoji"],
            }
        )

    rankings = {}
    for key, (label, days) in aggregate.PERIODS.items():
        ranked = aggregate.deck_ranking(results, days=days)
        for entry in ranked:
            theme = _theme_for(entry["deck_key"], entry["deck_name"], themes)
            entry["color"] = theme["color"]
            entry["emoji"] = theme["emoji"]
        rankings[key] = {"label": label, "items": ranked[:20]}

    decks = aggregate.deck_choices(results)
    for entry in decks:
        theme = _theme_for(entry["deck_key"], entry["deck_name"], themes)
        entry["color"] = theme["color"]
        entry["emoji"] = theme["emoji"]

    summary = aggregate.summary(results)
    latest = summary.get("latest_date") or ""
    summary["latest_date_label"] = _date_label(latest)
    summary["latest_first_count"] = sum(
        1 for r in results if r.rank == 1 and r.date == latest
    )

    return {
        "updatedAt": now_jst().strftime("%Y/%m/%d %H:%M"),
        "isSample": is_sample,
        # デッキ名がまだ1件も取れていないときは、ランキングと絞り込みを隠す。
        # 名前が無い状態でそれらを出しても空欄が並ぶだけで混乱させる。
        "hasNames": any(r.deck_name for r in results),
        "summary": summary,
        "results": rows,
        "rankings": rankings,
        "decks": decks[:24],
    }


STYLE = """
:root{
  --bg:#FFF7EC; --card:#FFFFFF; --ink:#2B2118; --muted:#7A6A5A;
  --gold:#FFB703; --blue:#3A86FF; --line:#EFE1CE; --shadow:0 3px 0 #E8D6BE;
}
*{box-sizing:border-box}
body{
  margin:0; background:var(--bg); color:var(--ink);
  font-family:"Hiragino Maru Gothic ProN","ヒラギノ丸ゴ ProN","Yu Gothic",
    "Meiryo",system-ui,sans-serif;
  font-size:18px; line-height:1.7; -webkit-text-size-adjust:100%;
}
.wrap{max-width:760px;margin:0 auto;padding:16px 14px 64px}
h1{font-size:28px;margin:8px 0 2px;letter-spacing:.02em}
.updated{color:var(--muted);font-size:14px;margin:0 0 14px}
.sample{
  background:#FFE8E8;border:3px dashed #E63946;border-radius:14px;
  padding:12px 14px;margin:0 0 16px;font-size:16px;color:#B3242F;font-weight:700;
}
.note-box{
  background:#EAF2FF;border:3px solid #BBD4FF;border-radius:14px;
  padding:12px 14px;margin:0 0 16px;font-size:16px;color:#1F4E9C;
}
.hero{
  background:linear-gradient(135deg,#FFD166,#FFB703);
  border-radius:22px;padding:18px 20px;margin-bottom:20px;box-shadow:var(--shadow);
}
.hero .cap{font-size:16px;font-weight:700;margin:0 0 6px}
.hero .name{font-size:30px;font-weight:800;margin:0;line-height:1.3;word-break:break-word}
.hero .note{font-size:15px;margin:6px 0 0}
.section-title{font-size:15px;color:var(--muted);margin:22px 0 8px;font-weight:700}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.span2{grid-column:1 / -1}
button{font-family:inherit;font-size:19px;font-weight:700;cursor:pointer}
.seg{
  min-height:60px;padding:6px 4px;border-radius:16px;
  border:3px solid var(--line);background:var(--card);color:var(--ink);
  box-shadow:var(--shadow);line-height:1.3;
  /* ひらがなが単語の途中で折り返されると読みにくいので、
     文節の空白でだけ改行させる */
  word-break:keep-all;overflow-wrap:normal;
}
.grid3 .seg{font-size:17px}
.seg[aria-pressed="true"]{background:var(--gold);border-color:#E09B00}
.seg.blue[aria-pressed="true"]{background:var(--blue);border-color:#2668D8;color:#fff}
.chips{display:flex;gap:8px;overflow-x:auto;padding:4px 0 10px;-webkit-overflow-scrolling:touch}
.chip{
  flex:0 0 auto;min-height:52px;padding:0 18px;border-radius:26px;
  border:3px solid var(--line);background:var(--card);color:var(--ink);font-size:17px;
}
.chip[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
.card{
  display:block;background:var(--card);border:3px solid var(--line);
  border-radius:20px;padding:14px 16px;margin-bottom:12px;
  text-decoration:none;color:inherit;box-shadow:var(--shadow);
}
.card:active{transform:translateY(2px);box-shadow:none}
.badge{
  display:inline-block;border-radius:999px;padding:3px 14px;font-size:15px;
  font-weight:800;color:#fff;margin-bottom:6px;
}
.badge.r1{background:var(--gold);color:#4A3200}
.badge.r2{background:var(--blue)}
.deck{font-size:25px;font-weight:800;line-height:1.35;margin:2px 0 6px;word-break:keep-all}
.meta{font-size:15px;color:var(--muted);word-break:keep-all}
.go{margin-top:8px;font-size:16px;font-weight:700;color:#1F6FEB}
.rankrow{display:flex;align-items:center;gap:14px}
.num{
  flex:0 0 auto;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;
  font-size:22px;font-weight:800;color:#fff;background:var(--muted);
}
.num.n1{background:var(--gold);color:#4A3200}
.num.n2{background:#B8C0CC;color:#2B2118}
.num.n3{background:#D9A066}
.count{font-size:16px;color:var(--muted);word-break:keep-all}
.count span{display:inline-block;margin-right:12px}
.empty{text-align:center;color:var(--muted);padding:36px 10px;font-size:17px}
footer{margin-top:28px;font-size:13px;color:var(--muted);line-height:1.8}
footer a{color:var(--muted)}
"""

SCRIPT = """
var DATA = __DATA__;
var state = { rank: "all", view: "new", deck: "all", period: "7d" };

function el(id){ return document.getElementById(id); }

function setPressed(container, value){
  var nodes = container.querySelectorAll("[data-value]");
  for (var i=0;i<nodes.length;i++){
    nodes[i].setAttribute("aria-pressed", nodes[i].dataset.value === value ? "true" : "false");
  }
}

function filtered(){
  return DATA.results.filter(function(r){
    if (state.rank !== "all" && String(r.rank) !== state.rank) return false;
    if (state.deck !== "all" && r.deckKey !== state.deck) return false;
    return true;
  });
}

function cardHtml(r){
  var cls = r.rank === 1 ? "r1" : "r2";
  var label = r.rank === 1 ? "ゆうしょう" : "じゅんゆうしょう";
  var where = [r.prefecture, r.store].filter(Boolean).join(" ");
  var league = r.league ? "・" + r.league : "";
  var go = r.hasCode ? "レシピ（60まい）を みる →" : "この デッキを みる →";
  // デッキ名がまだ取れていないときは、順位そのものを見出しにする
  var title = r.deck
    ? r.emoji + " " + esc(r.deck)
    : (r.rank === 1 ? "🏆 ゆうしょうデッキ" : "🥈 じゅんゆうしょうデッキ");
  return '<a class="card" href="' + r.recipeUrl + '" target="_blank" rel="noopener">' +
    '<span class="badge ' + cls + '">' + label + '</span>' +
    '<div class="deck">' + title + '</div>' +
    '<div class="meta">' + esc(r.dateLabel) + "　" + esc(where) + esc(league) + '</div>' +
    '<div class="go">' + go + '</div>' +
    '</a>';
}

function rankHtml(item, index){
  var n = index + 1;
  var cls = n <= 3 ? "num n" + n : "num";
  return '<div class="card"><div class="rankrow">' +
    '<div class="' + cls + '">' + n + '</div>' +
    '<div><div class="deck">' + item.emoji + " " + esc(item.deck_name) + '</div>' +
    '<div class="count"><span>ゆうしょう ' + item.first + 'かい</span>' +
    '<span>じゅんゆうしょう ' + item.second + 'かい</span></div>' +
    '</div></div></div>';
}

function esc(s){
  return String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function render(){
  var listBox = el("list");
  var periodBox = el("periodRow");
  var rankRow = el("rankRow");
  var deckBox = el("deckRow");

  if (state.view === "rank"){
    periodBox.style.display = "grid";
    rankRow.style.display = "none";
    deckBox.style.display = "none";
    el("deckTitle").style.display = "none";
    var items = (DATA.rankings[state.period] || {items:[]}).items;
    listBox.innerHTML = items.length
      ? items.map(rankHtml).join("")
      : '<div class="empty">まだ データが ありません</div>';
    return;
  }

  periodBox.style.display = "none";
  rankRow.style.display = "grid";
  if (DATA.hasNames){
    deckBox.style.display = "flex";
    el("deckTitle").style.display = "block";
  }
  var rows = filtered();
  listBox.innerHTML = rows.length
    ? rows.slice(0, 300).map(cardHtml).join("")
    : '<div class="empty">その デッキは まだ ありません</div>';
}

function boot(){
  var s = DATA.summary || {};
  var top = s.top_deck;
  if (top){
    el("heroCap").textContent = "いま いちばん つよい デッキ";
    el("heroName").textContent = top.deck_name;
    el("heroNote").textContent = "さいきん 1しゅうかんで " + top.first + "かい ゆうしょう";
  } else if (s.latest_first_count){
    // デッキ名がまだ無いとき。日付と件数だけでも「新しい結果が来た」ことは伝わる
    el("heroCap").textContent = "いちばん あたらしい けっか";
    el("heroName").textContent = s.latest_date_label;
    el("heroNote").textContent = "ゆうしょうデッキが " + s.latest_first_count + "こ あるよ";
  } else {
    el("heroCap").textContent = "";
    el("heroName").textContent = "まだ データが ないよ";
    el("heroNote").textContent = "";
  }
  el("updated").textContent = "こうしん: " + DATA.updatedAt;
  if (DATA.isSample) el("sample").style.display = "block";

  if (!DATA.hasNames){
    // デッキ名が無いあいだは、ランキングと絞り込みを出さない
    el("viewRow").style.display = "none";
    el("viewTitle").style.display = "none";
    el("deckRow").style.display = "none";
    el("deckTitle").style.display = "none";
    el("noNames").style.display = "block";
  }

  var chips = ['<button class="chip" data-value="all" aria-pressed="true">ぜんぶ</button>'];
  for (var i=0;i<DATA.decks.length;i++){
    var d = DATA.decks[i];
    chips.push('<button class="chip" data-value="' + esc(d.deckKey || d.deck_key) + '">' +
      d.emoji + " " + esc(d.deck_name) + '</button>');
  }
  el("deckRow").innerHTML = chips.join("");

  el("viewRow").addEventListener("click", function(e){
    var b = e.target.closest("[data-value]"); if(!b) return;
    state.view = b.dataset.value; setPressed(el("viewRow"), state.view); render();
  });
  el("rankRow").addEventListener("click", function(e){
    var b = e.target.closest("[data-value]"); if(!b) return;
    state.rank = b.dataset.value; setPressed(el("rankRow"), state.rank); render();
  });
  el("periodRow").addEventListener("click", function(e){
    var b = e.target.closest("[data-value]"); if(!b) return;
    state.period = b.dataset.value; setPressed(el("periodRow"), state.period); render();
  });
  el("deckRow").addEventListener("click", function(e){
    var b = e.target.closest("[data-value]"); if(!b) return;
    state.deck = b.dataset.value; setPressed(el("deckRow"), state.deck); render();
  });

  render();
}
document.addEventListener("DOMContentLoaded", boot);
"""

BODY = """
<div class="wrap">
  <h1>きょうの ポケカ</h1>
  <p class="updated" id="updated"></p>

  <div class="sample" id="sample" style="display:none">
    ⚠️ いまは れんしゅうよう の サンプルデータ です。
    ほんものの けっかに なるまで まってね。
  </div>

  <div class="hero">
    <p class="cap" id="heroCap"></p>
    <p class="name" id="heroName"></p>
    <p class="note" id="heroNote"></p>
  </div>

  <div class="note-box" id="noNames" style="display:none">
    デッキの なまえは まだ よみこめて いません。
    カードを タップすると、ほんものの レシピ（60まい）が みられます。
  </div>

  <div class="section-title" id="viewTitle">なにを みる？</div>
  <div class="grid2" id="viewRow">
    <button class="seg" data-value="new" aria-pressed="true">あたらしい じゅん</button>
    <button class="seg blue" data-value="rank" aria-pressed="false">つよい じゅん</button>
  </div>

  <div class="grid2" id="rankRow" style="margin-top:10px">
    <button class="seg" data-value="1" aria-pressed="false">ゆうしょう</button>
    <button class="seg blue" data-value="2" aria-pressed="false">じゅんゆうしょう</button>
    <button class="seg span2" data-value="all" aria-pressed="true">ぜんぶ みる</button>
  </div>

  <div class="grid3" id="periodRow" style="margin-top:10px;display:none">
    <button class="seg" data-value="7d" aria-pressed="true">1しゅうかん</button>
    <button class="seg" data-value="30d" aria-pressed="false">1かげつ</button>
    <button class="seg" data-value="all" aria-pressed="false">ぜんぶ</button>
  </div>

  <div class="section-title" id="deckTitle">デッキで さがす</div>
  <div class="chips" id="deckRow"></div>

  <div id="list"></div>

  <footer>
    データの もとは
    <a href="https://pokecabook.com/" target="_blank" rel="noopener">ポケカブック</a> と
    <a href="https://players.pokemon-card.com/" target="_blank" rel="noopener">ポケモンカードゲーム プレイヤーズクラブ</a>
    です。デッキの なかみは タップして もとの ページで みてね。<br>
    このページは 家族用の 個人的な まとめです。記事や 画像の 転載は していません。
  </footer>
</div>
"""


def build_html(data: dict, *, standalone: bool = True) -> str:
    """ページのHTMLを組み立てる。

    Args:
        standalone: True なら <!doctype html> から始まる完全なHTMLを返す
            (GitHub Pages 用)。False なら body の中身だけを返す。
    """
    payload = json.dumps(data, ensure_ascii=False)
    script = SCRIPT.replace("__DATA__", payload)
    inner = (
        f"{BODY}\n<style>{STYLE}</style>\n<script>{script}</script>"
    )
    if not standalone:
        return f"<title>きょうの ポケカ</title>\n{inner}\n"
    return (
        "<!doctype html>\n"
        '<html lang="ja">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n'
        '<meta name="theme-color" content="#FFB703">\n'
        "<title>きょうの ポケカ</title>\n"
        "</head>\n<body>\n"
        f"{inner}\n"
        "</body>\n</html>\n"
    )
