# ポケカ シティリーグ 優勝デッキまとめ

シティリーグの結果から **優勝・準優勝のデッキだけ** を自動で集めて、
8歳の子どもが一人で読めるページにして毎日更新する仕組み。

店舗ごとにページを行き来しなくても、1つのページで
「いま何が勝っているか」が分かるようにするのが目的。

---

## 1. できること

| | 中身 | 状態 |
|---|---|---|
| あたらしい じゅん | 優勝・準優勝デッキを日付の新しい順に一覧 | ✅ 動く |
| タップ | 公式デッキコードのレシピページ (実物の60枚) へ移動 | ✅ 動く |
| つよい じゅん | 直近1週間 / 1ヶ月 / 全期間の優勝回数ランキング | ⏸ デッキ名待ち |
| デッキで さがす | デッキ名のボタンで絞り込み (文字入力なし) | ⏸ デッキ名待ち |

トップには「いま いちばん つよい デッキ」(直近1週間で最も優勝しているデッキ) が出る。
日々のデッキ作りの参考にはこれが一番効く。

⏸ の2つは **デッキ名** が要る。収集元にデッキ名が書かれていないため現在は保留中
(詳細は 2 の「デッキ名について」)。デッキ名が1件も無いあいだ、ページは
これらを自動で隠して新着一覧だけを表示する。

## 2. 全体の流れ

```
毎日 08:00 JST  GitHub Actions が起動
        ↓
ポケカブック (WP REST API で記事本文を取得)
  → 開催日・店舗・都道府県・順位・デッキコード・公式イベントURL
        ↓
   (任意) 公式イベントページを辿ってリーグ区分を補う
        ↓
data/pokeca/results.json に追記 (日付・店舗・リーグ・順位 で重複排除)
        ↓
site/index.html を生成 → GitHub Pages に公開
        ↓
子どもはホーム画面のアイコンをタップするだけ
```

### 実際の記事構造 (archives/320777 で確認済み)

```html
<div class="entry-content">
  <h2><span id="toc1">宝島　岐阜本店（岐阜）</span></h2>
  <p><a href="https://players.pokemon-card.com/event/detail/953108/result">大会結果</a></p>
  <figure class="wp-block-gallery">
    <figure class="wp-block-image">
      <a href="...jpg"><img src="...1_1_8YGKY8-wTd9K2-8Dacc4.jpg"></a>
      <figcaption>
        <a href="https://www.pokemon-card.com/deck/confirm.html/deckID/8YGKY8-wTd9K2-8Dacc4">優勝</a>
      </figcaption>
    </figure>
    ... 準優勝 / TOP4 / TOP8 / TOP16 が続く
  </figure>
  <h2>... 次の店舗 ...</h2>
</div>
```

1記事に21店舗ぶんが並び、各店舗に 優勝1・準優勝1・TOP4×2・TOP8×4・TOP16×8。
このうち 優勝と準優勝だけを取る。

ここから分かった重要な性質:

- ✅ **公式デッキコードが全エントリーに付いている**。
  そのまま実物の60枚レシピを開けるので、レシピへの導線はこれで完結する。
  当初は公式サイトから取るつもりだったが、その必要が無くなった
- ✅ **公式イベントページのURL**も店舗ごとに付いている（リーグ区分の補完に使える）
- ✅ `<h2>` 内の `<span id="tocN">` で、元記事の該当店舗へ直接ジャンプできる
- ❌ **デッキ名がどこにも書かれていない**。デッキの中身は画像で示されており、
  文字情報は順位ラベルとデッキコードだけ

### デッキ名について (未解決)

ランキングと絞り込みにはデッキ名が要るが、上記のとおりこの記事からは取れない。
`DeckResult.deck_name` は空のまま保存され、あとから別の情報源で埋める設計にしてある
(`merge_results` が空欄だけを埋める)。

デッキ名が1件も無いあいだ、子ども向けページは自動的に
**ランキングとデッキ絞り込みを隠し、新着一覧だけを表示する**。
「優勝・準優勝だけを一覧にする」という本来の目的はこの状態でも果たせる。

名前を埋める候補:

1. ポケカブックのデッキ別ページ (例: 「ポケカ【ドラパルトex】優勝デッキレシピまとめ」)
   を巡回し、**デッキコード → デッキ名** の対応表を作る ← 本命。要検証
2. デッキコードから公式のレシピページを開き、採用カードからデッキ名を推定する

## 3. 最初のセットアップ (親が1回だけ)

### 3-1. GitHub Pages を有効にする

リポジトリの **Settings > Pages > Build and deployment** で
Source を **GitHub Actions** に変更する。

> ⚠️ Pages を公開にすると、URLを知っている人は誰でも見られる。
> 公開しているのは `site/` の中身だけで、リポジトリの他のファイルは含まれない。
> 家族だけで使いたい場合は、Pages を使わずに 4-2 のローカル運用にする。

### 3-2. ワークフローを手動で1回動かす

**Actions > Collect Pokeca city league decks > Run workflow**

`dry_run` を `true` にすると、保存せず収集結果だけを確認できる。
まずはこれで何件取れるか見るのがおすすめ。

### 3-3. 子どものスマホ・タブレットに登録する

公開された Pages の URL を開いて、ブラウザの共有メニューから
**「ホーム画面に追加」**。アプリのアイコンのように起動できるようになる。

## 4. コマンド

### 4-1. ふだん使うもの

```bash
python -m src.pokeca.cli collect            # 収集して results.json を更新
python -m src.pokeca.cli collect --dry-run  # 保存せず結果だけ見る
python -m src.pokeca.cli collect --with-league  # リーグ区分も補う(未検証)
python -m src.pokeca.cli build            # site/index.html を生成
python -m src.pokeca.cli list --rank 1    # 優勝デッキだけ一覧 (親の確認用)
python -m src.pokeca.cli rank --days 7    # 直近1週間のランキング
```

### 4-2. GitHub を使わずローカルだけで運用する場合

```bash
python -m src.pokeca.cli collect
python -m src.pokeca.cli build
open site/index.html      # ブラウザで開くだけ。ネット公開しない
```

生成される `site/index.html` は1ファイル完結 (CSS・JS・データを全部内包)。
そのままメールで送ったり、タブレットにコピーしてオフラインで開いてもよい。

### 4-3. 動作確認用

```bash
python -m src.pokeca.cli sample   # ダミーデータを入れる
python -m src.pokeca.cli build    # ページを作って見た目を確認
python -m pytest tests/test_pokeca.py -q
```

サンプルデータで生成したページには「これは練習用です」の警告が出る。

## 5. 検証の状況

| 部分 | 状態 |
|---|---|
| ポケカブックの本文パーサー | ✅ **実物のHTMLで検証済み**。archives/320777 から21店舗×2=42件を全件抽出、デッキコード欠落0 |
| WP REST API での記事取得 | ⚠️ 未検証。`/wp-json/wp/v2/` が有効かどうかは実際に叩くまで不明 |
| 公式サイトのリーグ補完 | ⚠️ 未検証。既定で無効 (`--with-league` を付けたときだけ動く) |

`tests/fixtures/pokecabook_city_league.html` は実際に保存したページから
先頭2店舗ぶんを抜き出したもの。構造は実物のまま。

### 構造が変わってパーサーが空振りしたら

```bash
python -m src.pokeca.cli inspect --source pokecabook   # 実物を保存
```

`data/pokeca/_inspect/` に生のJSON・HTMLが落ちる。それを見て
`src/pokeca/sources/pokecabook.py` を直し、
**新しい実物で fixture を差し替えてから** テストを通すこと。

### 想定される詰まりどころ

| 症状 | 原因の見当 |
|---|---|
| REST API が 404 | REST API が無効。カテゴリRSS (`/archives/category/tournament/city-league/feed/`) に切り替える |
| 記事は取れるが0件 | `content.rendered` に `.entry-content` ラッパーが無い場合がある。パーサーは両対応済みだが、ギャラリー構造が変わっていないか確認 |
| 店舗名に都道府県が付く | `split_store()` の括弧パターンを確認 |
| リーグ補完が全部空 | 公式ページがJavaScript描画。`--with-league` を外して運用する (無くても困らない) |
| ランキングが同じデッキで割れる | 表記ゆれ。`data/pokeca/deck_themes.yaml` の `aliases` に追記 |

## 6. 収集が止まったときの通知

サイト構造が変わると、エラーは出ないのにデータだけ増えない状態になりやすい。
これを検知するため、毎日 `healthcheck` が走る。

最新の開催日が10日以上前になると、自動で `pokeca-alert` ラベル付きの
Issue が立つ (同じ Issue が開いているあいだは重複して立てない)。

```bash
python -m src.pokeca.cli healthcheck --max-age-days 10
```

## 7. 方針として決めたこと

### 著作権・マナー

- **転載しない**。保存するのは「日付・店舗・順位・デッキ名・元記事URL」という
  事実データとリンクだけ。記事本文もレシピ画像もコピーしない。
  デッキの中身は必ず元サイトを開いて見る導線にしている
- **robots.txt を必ず確認**してから取得する (`src/pokeca/http.py`)。
  禁止されていれば取得しない
- **同一ホストへのアクセスは1.5秒あける**。1日1回の巡回なので相手への負荷はごく小さい
- User-Agent に用途と連絡先を明記している

### プライバシー

- **プレイヤー名は保存しない**。公開ページに他人の名前が載るのを避けるため。
  順位とデッキの対応だけ分かれば目的は達成できる

### 子ども向けUIの設計意図

- **文字入力をさせない**。操作は大きなボタンのタップだけ
- **UIの文言はひらがな**。日付も「5がつ6にち」形式
- デッキ名はカタカナが多くそのまま読めるので、文字を大きくして主役にする
- ひらがなが単語の途中で折り返されると読みにくいので `word-break: keep-all`
- タップ領域は最低52px。指が大きくズレても押せるように
- デッキごとに色と絵文字を固定 (`data/pokeca/deck_themes.yaml`)。
  文字を読まなくても色で見分けられる

## 8. ファイル構成

```
src/pokeca/
├── models.py           # DeckResult (共通データモデル) と正規化
├── store.py            # results.json の読み書き・マージ
├── aggregate.py        # ランキング集計
├── site.py             # 子ども向けHTMLの生成
├── http.py             # robots.txt 遵守・アクセス間隔制御
├── cli.py              # コマンド
└── sources/
    ├── pokecabook.py   # ポケカブック (結果とデッキコードの担当)
    └── official.py     # 公式プレイヤーズクラブ (リーグ区分の補完のみ)

data/pokeca/
├── results.json        # 収集結果 (これが資産)
├── deck_themes.yaml    # デッキの色・絵文字・表記ゆれ統合
└── _inspect/           # inspect コマンドの出力 (gitignore)

site/index.html         # 生成物。GitHub Pages で公開される
tests/
├── test_pokeca.py                          # パーサー・マージ・集計のテスト
└── fixtures/pokecabook_city_league.html    # 実物HTMLの抜粋 (テスト用)
```

情報源を足したいときは `sources/` にファイルを1つ追加して
`cli.py` の `SOURCE_NAMES` に登録すれば済むようにしてある。
