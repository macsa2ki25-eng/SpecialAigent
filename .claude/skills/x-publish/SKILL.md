---
name: x-publish
description: 承認済みのX投稿/ブログ記事を実際に公開する。「投稿して」「Xに上げて」「ブログ公開して」「全部公開」などの依頼で発火。
---

# 投稿公開スキル (X + はてなブログ)

## 目的

承認済み (`status: approved`) の投稿を、種別に応じて X / はてなブログ / 両方 に公開する。

## コマンドの選び方

| 言い回し例 | コマンド |
|---|---|
| 「Xに投稿して」「Xだけ」 | `python -m src.cli publish --target x` |
| 「ブログ公開して」 | `python -m src.cli publish --target blog` |
| 「全部公開」「両方投稿」 | `python -m src.cli publish --target all` |
| 「3件だけX投稿」 | `python -m src.cli publish --target x --limit 3` |

## 守ってほしいこと

- 必ず `python -m src.cli publish` を使う (生のAPIを直接叩かない)
- 投稿前に **必ず** ユーザー確認:
  1. `python -m src.cli publish --target <X> --dry-run` で何が投稿されるか表示
  2. 「この内容を公開してよいですか?」と問いかける
  3. 明示的Yesが返ってきたら本実行
- X (Pay Per Use) は投稿1件あたりクレジット消費、`MAX_POSTS_PER_DAY` でソフト制限
- はてなブログは AtomPub 経由 (`MAX_BLOG_POSTS_PER_DAY` でソフト制限)
- 失敗したファイルは `pending/` に残るので再試行可能
- 投稿エラー (401/403/Payment Required等) は `.env` のキー、権限設定、クレジット残高を疑う

## 完了時に必ず伝えること

- X / ブログ それぞれの 成功/失敗 件数
- 投稿した URL 一覧 (各最大3件)
- 失敗があれば原因の推定とユーザーへの対処案内
