---
name: x-generate
description: X(旧Twitter)向けの投稿文を生成して承認キューに入れる。雑学・ライフハック・心に響く言葉のテーマで、バズ型テンプレートに沿った日本語投稿をClaude APIで生成する。「今日の投稿を3件作って」「雑学ネタで5件生成して」などの依頼で発火。
---

# X 投稿生成スキル

## 目的

このリポジトリ `SpecialAigent` のプロジェクトルートで、`src/cli.py` を通じて X 投稿文を生成する。

## 守ってほしいこと

- 生成は **必ず** `python -m src.cli generate --count N` で行う (このスキル内で独自にAPIを呼ばない)
- `count` は未指定なら 3、明示されたらその数
- 特定の「型」や「テーマ」が会話で指定されていたら `--pattern` / `--topic` オプションを使う
  - 利用可能な型 ID は `templates/viral_patterns.yaml` を参照
- 生成後、`python -m src.cli status` で現在のキュー件数を表示する
- 生成した内容は承認前のため、**絶対に投稿しない**(投稿は `x-publish` スキルの担当)
- `.env` が未設定ならエラーメッセージを日本語で説明し、`docs/SETUP.md` を読むよう案内する

## 完了時に必ず伝えること

「承認キューに N 件追加しました。次は `python -m src.cli review` でレビューするか、『レビューして』と言ってください」
