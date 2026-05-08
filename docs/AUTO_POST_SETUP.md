# GitHub Actions 自動投稿のセットアップ手順 (妻向け)

知育投稿を毎日3回（7:30 / 12:30 / 21:30 JST）、自分のPCに関係なく
GitHubのクラウド上で自動投稿する仕組みを動かすためのセットアップです。

## やること（1回だけ、所要 約10分）

1. GitHubリポジトリの「Secrets」にAPIキーを登録
2. ブランチ保護を一時的に緩める（不要な場合は飛ばしてOK）
3. テスト実行 (dry-run)

## 1. Secrets 登録

ブラウザで以下にアクセス:

```
https://github.com/macsa2ki25-eng/SpecialAigent/settings/secrets/actions
```

「**New repository secret**」ボタンを押して、以下を**1つずつ**登録：

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` (Claude のキー) |
| `X_API_KEY` | 妻のXのAPI Key |
| `X_API_SECRET` | 妻のXのAPI Secret |
| `X_ACCESS_TOKEN` | 妻のXのAccess Token |
| `X_ACCESS_TOKEN_SECRET` | 妻のXのAccess Token Secret |
| `X_USERNAME` | 妻のXユーザー名 (`@`なし) |

**ヒント**: 妻のPCの `.env` ファイルから値をコピーすれば確実。

⚠️ Secretsは登録したら**もう中身は見えなくなる**（編集はできるが値の確認不可）。
なので妻のPCの `.env` も大事に保管しておくこと。

## 2. テスト実行（dry-run）

ブラウザで:

```
https://github.com/macsa2ki25-eng/SpecialAigent/actions/workflows/auto-post.yml
```

→ 右上の「**Run workflow**」ボタン
→ Branch: `claude/x-revenue-automation-MegUY` を選択
→ `dry_run` を **true** にチェック
→ 「Run workflow」緑ボタン

数十秒で結果が出ます。「✅ 投稿完了」ではなく**生成された投稿の本文だけ表示**されればOK。
このとき**実際にはXに投稿されない**ので、内容を確認できる。

## 3. 本番テスト（実投稿）

dry-runで内容問題なければ、同じ画面で `dry_run` を **false** にして「Run workflow」。
これで実際に妻のXに1投稿される。

## 4. 自動稼働

cronスケジュール（7:30 / 12:30 / 21:30 JST）は、リポジトリのデフォルトブランチ
（通常は `main`）でしか動きません。

現在の作業ブランチ `claude/x-revenue-automation-MegUY` を **`main` にマージ**するか、
リポジトリのデフォルトブランチを `claude/x-revenue-automation-MegUY` に変更すると、
自動稼働が始まります。

⚠️ どちらにするかは夫と相談してください。マージのほうが標準的な進め方です。

## トラブルシューティング

### 「No credits」と出る (X側)
→ X Developer Portal でクレジット追加。妻のクレカで $5〜10 追加。

### Claude APIエラー
→ Anthropic Console で残高確認。$0 なら追加。

### Run workflow ボタンが無い
→ GitHubの権限設定。Settings → Actions → 「Allow all actions」に。

### 投稿カウントが増えない
→ Actions ログを見て、最後の commit step が成功しているか確認。
   `permissions: contents: write` が無いと書き戻しできない。

### スマホから手動で動かしたい
→ GitHubアプリで Actions → 同じワークフロー → Run workflow が可能。
   またはClaude Codeセッションから「auto-postを今動かして」と頼めば、
   GitHub MCPツール経由でトリガーできる。

## ネタ追加方法

`data/chiiku_topics.yaml` に新しいトピック / アングルを追記してcommit/pushするだけ。
次回の自動実行から新ネタが使われる。

詳細は [docs/PRODUCTS_GUIDE.md](./PRODUCTS_GUIDE.md) と同様の書式。
