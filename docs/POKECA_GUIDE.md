# ポケカ シティリーグ 優勝デッキまとめ

シティリーグの結果から **優勝・準優勝のデッキだけ** を自動で集めて、
8歳の子どもが一人で読めるページにして毎日更新する仕組み。

店舗ごとにページを行き来しなくても、1つのページで
「いま何が勝っているか」が分かるようにするのが目的。

---

## 1. できること

| | 中身 |
|---|---|
| あたらしい じゅん | 優勝・準優勝デッキを日付の新しい順に一覧 |
| つよい じゅん | 直近1週間 / 1ヶ月 / 全期間の優勝回数ランキング |
| デッキで さがす | デッキ名のボタンで絞り込み (文字入力なし) |
| タップ | 公式デッキコードのレシピページ、または元記事へ移動 |

トップには常に「いま いちばん つよい デッキ」(直近1週間で最も優勝している
デッキ) が出る。日々のデッキ作りの参考にはこれが一番効く。

## 2. 全体の流れ

```
毎日 08:00 JST  GitHub Actions が起動
        ↓
   ┌────────────────┴────────────────┐
   ↓                                  ↓
ポケカブック                    公式プレイヤーズクラブ
(WP REST API で記事取得)        (イベント結果ページ)
デッキ名・店舗・日付・順位        デッキコード・店舗・日付
   └────────────────┬────────────────┘
                     ↓
        日付・店舗・リーグ・順位 で突き合わせて統合
        (デッキ名はポケカブック、レシピは公式から)
                     ↓
        data/pokeca/results.json に追記 (重複排除)
                     ↓
        site/index.html を生成 → GitHub Pages に公開
                     ↓
        子どもはホーム画面のアイコンをタップするだけ
```

2つの情報源を使い分けているのは、それぞれ持っている情報が違うため。

- **ポケカブック**: 「ドラパルトex」のような **デッキ名** が付いている
- **公式サイト**: **デッキコード** があり、実物の60枚レシピを開ける

`slot_id` (日付・店舗・リーグ・順位) をキーに突き合わせて、
片方にしかない情報を補い合う。

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
python -m src.pokeca.cli collect          # 収集して results.json を更新
python -m src.pokeca.cli collect --dry-run # 保存せず結果だけ見る
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

## 5. ⚠️ 本物のデータが取れるようになるまで

**開発時、収集元サイトのHTMLを実際に確認できていない** (開発環境から
外部サイトへ接続できなかったため)。そのため
`src/pokeca/sources/` のパーサーは「ありそうな構造」に対する推定で書いてある。

初回の `collect` で0件だったり、変なデータが混じった場合は次の手順で直す。

```bash
# 1. 実物の構造を保存する
python -m src.pokeca.cli inspect --source pokecabook
python -m src.pokeca.cli inspect --source official
```

`data/pokeca/_inspect/` に生のHTML・JSONが落ちるので、それを見て
`src/pokeca/sources/pokecabook.py` の正規表現や
`src/pokeca/sources/official.py` のセレクタを直す。

直したら **実物の構造をテストケースとして `tests/test_pokeca.py` に追加する**。
次にサイト構造が変わったときに気づけるようになる。

### 想定される詰まりどころ

| 症状 | 原因の見当 |
|---|---|
| ポケカブックで0件 | WP REST API が無効。カテゴリRSS (`/archives/category/tournament/city-league/feed/`) に切り替える |
| 店舗名が空で捨てられる | 見出しの書き方が想定と違う。`STORE_HINT` を調整 |
| 公式で0件 | ページがJavaScript描画。裏で叩いているAPIを探すか、公式はいったん諦めてポケカブックだけにする |
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
    ├── pokecabook.py   # ポケカブック (デッキ名の担当)
    └── official.py     # 公式プレイヤーズクラブ (デッキコードの担当)

data/pokeca/
├── results.json        # 収集結果 (これが資産)
├── deck_themes.yaml    # デッキの色・絵文字・表記ゆれ統合
└── _inspect/           # inspect コマンドの出力 (gitignore)

site/index.html         # 生成物。GitHub Pages で公開される
tests/test_pokeca.py    # パーサー・マージ・集計のテスト
```

情報源を足したいときは `sources/` にファイルを1つ追加して
`cli.py` の `SOURCE_NAMES` に登録すれば済むようにしてある。
