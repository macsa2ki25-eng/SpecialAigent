---
name: x-generate
description: 妻が買った商品から、X投稿とブログ記事を生成して承認キューに入れる。「ネコソギの投稿作って」「商品〇〇でブログも一緒に」「未投稿の商品から3件生成」などの依頼で発火。
---

# 投稿生成スキル (商品レビュー × X × ブログ)

## 目的

`SpecialAigent` プロジェクトルートで `src/cli.py generate` を呼び、
`data/products.yaml` の商品から X投稿/ブログ記事を生成し承認キュー (`data/posts/pending/`) に入れる。

## コマンドの選び方

ユーザーの言い回しから以下を推定する:

| 言い回し例 | コマンド |
|---|---|
| 「ネコソギの投稿作って」 | `--product necosogi-2025 --x` |
| 「ネコソギでブログ記事も」 | `--product necosogi-2025 --blog` |
| 「ネコソギで全部作って」 | `--product necosogi-2025 --all` |
| 「未投稿のから3件X」 | `--auto --x --count 3` |
| 「正直レビュー型でX」 | `--x --pattern honest_review` |
| 「比較記事のブログ」 | `--blog --pattern comparison` |

商品IDが明確でなければ、まず `python -m src.cli products` で一覧表示してユーザーに確認する。

## 守ってほしいこと

- 必ず `python -m src.cli generate ...` 経由で実行 (このスキル内で独自にAPIを呼ばない)
- 利用可能なX投稿の型は `templates/x_review_patterns.yaml` 参照
- 利用可能なブログの型は `templates/blog_patterns.yaml` 参照
- 商品リストは `data/products.yaml` 参照
- 生成後、`python -m src.cli status` で現在のキュー件数を表示する
- 生成内容は承認前のため、**絶対に投稿しない** (投稿は `x-publish` スキルの担当)
- `.env` が未設定ならエラーメッセージを日本語で説明し、`docs/SETUP_FOR_WIFE.md` を読むよう案内

## 完了時に必ず伝えること

「承認キューに X×N件 / ブログ×N件 を追加しました。次は `python -m src.cli review` でレビューするか、『レビューして』と言ってください」
