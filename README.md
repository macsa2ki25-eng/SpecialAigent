# SpecialAigent

X (旧Twitter) ・ はてなブログ・Instagram(予定) を横断する半自動コンテンツ投稿エージェント。

主な3つの運用モード:
- **知育自動投稿**: 1日3回、子育て世帯向けの知育Tipsを完全自動でXに投稿 (cron運用)
- **商品レビュー**: 妻が買った商品からX投稿+はてなブログ記事を半自動生成・投稿 (アフィリエイト導線)
- **教育系スレッド**: お金や経済の概念を物語化したXスレッド投稿 (任意稼働)

## コンセプト

「妻が実際に買ってよかったもの」を起点に、

- **ブログ記事(長文)** : SEOで検索流入を取り、複数のアフィリリンクで収益化
- **X投稿(短文 × 複数アングル)** : ブログへの誘導 + 直接ブランディング

を同時生成する。

```
data/products.yaml に商品を追加
        ↓
[generator]  楽天APIで商品情報取得 + バズ参考例
        ↓
   ┌────────────┴────────────┐
   ↓                          ↓
ブログ記事(長文1本)           X投稿(短文を複数アングル)
- 楽天/Amazonアフィリ複数貼   - 本文+リプライURLの2連投
        ↓                          ↓
[review] 妻が承認                [publish]
        ↓                          ↓
[publish --target blog]        [publish --target x]
        ↓                          ↓
   はてなブログAtomPub           X API v2
```

## クイックスタート

詳しいセットアップ手順は [docs/SETUP_FOR_WIFE.md](./docs/SETUP_FOR_WIFE.md) 参照。

```bash
# 商品リストを確認
python -m src.cli products

# 商品IDを指定してX投稿+ブログ記事を一気に生成
python -m src.cli generate --product necosogi-2025 --all

# 承認 (対話式)
python -m src.cli review

# 公開
python -m src.cli publish --target all
```

## ディレクトリ構成

```
.
├── data/
│   ├── products.yaml          # ★妻が買った商品リスト (手動追加)
│   ├── buzz_examples.yaml     # 参考にするバズ投稿サンプル
│   └── posts/
│       ├── pending/           # 生成済み・承認待ち
│       ├── published/         # 投稿済みアーカイブ
│       └── rejected/          # 却下アーカイブ
├── templates/
│   ├── x_review_patterns.yaml   # X投稿の型
│   └── blog_patterns.yaml       # ブログ記事の型
├── src/
│   ├── affiliate.py     # 楽天API + アフィリリンク生成
│   ├── researcher.py    # 商品 + バズ例のリサーチ統合
│   ├── generator.py     # Claude APIで投稿/記事生成
│   ├── publisher.py     # X API + はてなブログAtomPub
│   ├── queue.py         # 承認キュー対話レビュー
│   ├── config.py        # .env と設定ファイル読込
│   └── cli.py           # 統合CLI
└── docs/
    ├── SETUP_FOR_WIFE.md       # 妻向けセットアップ手順
    └── PRODUCTS_GUIDE.md       # products.yaml の書き方
```

## 主要コマンド

```bash
# 知育 (1日3回 cron 自動投稿)
python -m src.cli topics-chiiku                # ネタ・残アングル一覧
python -m src.cli auto-post                    # 1件生成して即時投稿 (cron用)
python -m src.cli auto-post --dry-run          # 投稿せず生成内容だけ確認

# 商品一覧
python -m src.cli products

# 生成
python -m src.cli generate --product <id> --x         # X投稿1件
python -m src.cli generate --product <id> --x --count 3 # X投稿3件 (型バラバラ)
python -m src.cli generate --product <id> --blog      # ブログ記事1件
python -m src.cli generate --product <id> --all       # X(1) + ブログ(1)
python -m src.cli generate --auto --x --count 3       # 未投稿商品から自動選んでX×3

# 承認
python -m src.cli review

# 公開
python -m src.cli publish --target x
python -m src.cli publish --target blog
python -m src.cli publish --target all
python -m src.cli publish --target x --dry-run        # 投稿せず内容だけ表示

# 状態
python -m src.cli status

# 疎通テスト
python -m src.cli test-claude
python -m src.cli test-x
python -m src.cli test-rakuten
python -m src.cli test-hatena
```

## 投稿フロー詳細

### X投稿
- **本ツイート**: 体験談ベースの本文 (140字以内)
- **リプライ**: アフィリリンク + 「※楽天アフィリエイト含む」表記
- 本文には URL を入れない (Xアルゴリズム上、外部リンクは拡散低下要因)

### ブログ記事
- **タイトル**: SEO最適化 (「商品名 + ベネフィット」)
- **本文**: 1500〜3000字、はてなブログ Markdown 記法
- **アフィリリンク**: 記事内に2〜3箇所、`{AFFILIATE_LINK}` プレースホルダーが自動置換される
- **記事末尾**: 「※本記事には楽天アフィリエイトリンクを含みます」

## ⚠️ 運用上の注意

- **公務員の副業規制**: 当アカウントは妻が運営主体である必要があります。投稿の判断・承認・収益受領はすべて妻の名義・主体で行ってください。
- **薬機法・景表法**: 「治る」「絶対効く」などの断定表現はAI側でNGに設定済みですが、レビュー時に必ず確認してください。
- **楽天アフィリエイト規約**: 「ステマ」と取られないよう、リプライに必ず「※楽天アフィリエイト含む」を入れています。
