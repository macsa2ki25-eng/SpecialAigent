---
name: x-publish
description: 承認済みの投稿をXに実際に投稿する。X API v2 Free tierを使用。「投稿して」「Xに上げて」「公開して」などの依頼で発火。
---

# X 投稿公開スキル

## 目的

承認済み (`status: approved`) の投稿を X API v2 で公開する。

## 守ってほしいこと

- 必ず `python -m src.cli publish` を使う (生のAPIを直接叩かない)
- 投稿前に **必ず** ユーザーに確認を取る:
  1. `python -m src.cli publish --dry-run` で何が投稿されるかを表示
  2. 「この N 件を投稿してよいですか?」と問いかける
  3. 明示的にYesが返ってきたら `python -m src.cli publish` を実行
- Free tier は月 500 投稿が上限。1日あたりの上限 (`MAX_POSTS_PER_DAY`) は `.env` で制御される
  - もし `429 Too Many Requests` が返ってきたら、レート制限に達している可能性を案内
- 投稿に失敗した場合、ファイルは `pending/` に残るので再試行可能
  - 3回失敗したら「X API側の問題の可能性」として一旦止めるようユーザーに伝える

## 完了時に必ず伝えること

- 成功/失敗の件数
- 投稿した URL 一覧 (最大5件)
- 今月の累計投稿数 (Free tier 500/月 に対する残量)
