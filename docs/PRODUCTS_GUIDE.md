# 商品の追加方法 (`data/products.yaml`)

「買って使ってよかったもの」を追加するだけで、AIがX投稿とブログ記事を作ります。

## 基本の書き方

`data/products.yaml` をメモ帳などで開いて、`products:` の下に1ブロック追記:

```yaml
  - id: my-product-001
    name: 商品名
    search_query: 楽天で検索するときのキーワード
    category: ジャンル名
    problem: |
      この商品を買う前、どんなことに困っていたか
      複数行OK
    experience: |
      実際に使ってどうだったか
      具体的な数字や日数があると◎
    recommended_for: こんな人におすすめ
    price_paid: 2980
    bought_at: 2026-04-20
    tags: [タグ1, タグ2]
    posted_at_x: null
    posted_at_blog: null
```

## 各項目の詳細

### `id` (必須)
- 半角英数+ハイフンで唯一の識別子
- 例: `necosogi-2025`, `kitchen-spatula-001`
- 後で「あの商品どうなった?」と確認するときの目印

### `name` (必須)
- 商品名 (人間が読める形)
- 例: `ネコソギトップ粒剤`

### `search_query` (必須)
- 楽天で検索するときに使うキーワード
- 商品名+補足情報で組み立てる
- 例: `ネコソギ 顆粒 除草剤 2kg`
- ★ ここが具体的だと、AIが正しい商品情報(価格・URL)を取得できます

### `category` (必須)
- ジャンルを文字列で。例:
  - 園芸・ガーデニング
  - キッチン用品
  - 子育て用品
  - 家電
  - 文房具
  - 洗濯・掃除
  - 美容
  - 食品

### `problem` (必須)
- この商品を買うに至った「困りごと」
- 自分の言葉で書く。3〜5行が目安
- ★ ここが具体的だと、共感を呼ぶ投稿になります
- 例: 「庭の雑草が手作業では追いつかない。草刈り機を回しても2週間で元通り。腰も痛い。」

### `experience` (必須)
- 実際に使った体験
- 「使い方」「いつから使い始めた」「どう変化した」「どのくらい持つか」など
- 5〜8行が目安
- ★ ここが商品レビューの肝。手抜き禁止

### `recommended_for` (推奨)
- どんな人にすすめたいか
- 例: 「戸建てで庭の雑草に毎年悩んでる人」

### `price_paid` (推奨)
- 実際に払った金額 (円、整数)
- 楽天の現在価格と違っても構わない (体験談用)

### `bought_at` (推奨)
- 購入日 (YYYY-MM-DD)
- 投稿の鮮度感を出すため

### `tags` (推奨)
- 検索しやすさのため。例: `[庭, 除草, 時短]`

### `posted_at_x` / `posted_at_blog` (自動更新)
- 投稿後にツールが自動で書き込み
- 最初は `null` のままでOK

## 商品を追加する流れ

1. 何か買って、使ってみる
2. 「これは紹介できそう」と思ったら、`data/products.yaml` に追記
3. `python -m src.cli products` で一覧確認
4. `python -m src.cli generate --product <id> --all` で生成
5. `python -m src.cli review` で確認・編集・承認
6. `python -m src.cli publish --target all` で公開

## 1商品から複数の投稿パターン

同じ商品で**異なる切り口のX投稿**を作れます:

```powershell
# 王道の問題解決型
python -m src.cli generate --product necosogi-2025 --x --pattern problem_solving

# 数字でインパクトを出す型
python -m src.cli generate --product necosogi-2025 --x --pattern before_after

# あえて欠点も書く正直レビュー型
python -m src.cli generate --product necosogi-2025 --x --pattern honest_review

# 「もっと早く知りたかった」型
python -m src.cli generate --product necosogi-2025 --x --pattern late_discovery

# 「こういう人にだけ」と限定する型
python -m src.cli generate --product necosogi-2025 --x --pattern scenario_specific
```

ブログも複数パターンあります (詳しくは `templates/blog_patterns.yaml` を参照):

```powershell
python -m src.cli generate --product necosogi-2025 --blog --pattern product_review  # 標準
python -m src.cli generate --product necosogi-2025 --blog --pattern comparison      # 比較記事
python -m src.cli generate --product necosogi-2025 --blog --pattern problem_solving # 悩み解決型
```

## ⚠️ 大事なこと

- **本当に買って使った商品だけ書く**: 嘘のレビューは規約違反、信頼も失う
- **薬機法表現に注意**: 「治る」「絶対効く」「医薬品的効果」は書かない (AIにも禁止指示済みだが、レビュー時にも目視確認)
- **写真もあると尚良し**: 将来、画像投稿機能を足せます (今はテキストのみ)
