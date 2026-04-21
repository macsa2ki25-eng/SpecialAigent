# セットアップ手順

プログラミング未経験でも、この手順に沿って上から順にやれば動かせます。
どこかで詰まったら、そのまま Claude Code にスクショを貼って聞いてください。

---

## 所要時間の目安

- 環境構築: 20分
- X API 申請: 30〜60分（審査が入ることがある）
- Claude API キー取得: 5分
- 動作確認: 10分

合計 1〜2時間 で動き始められます。

---

## 1. 必要なもの

- パソコン（Windows / Mac どちらでもOK）
- Python 3.10 以上
- Claude Desktop アプリ（Claude Code を使う場合）
- X (Twitter) アカウント
- Claude API の有料クレジット（最低 $5 から。1投稿あたり約 $0.01）

---

## 2. リポジトリのクローンと依存インストール

```bash
git clone <このリポジトリのURL>
cd SpecialAigent

# Python の仮想環境を作る（推奨）
python -m venv venv

# 仮想環境を有効化
# Mac/Linux:
source venv/bin/activate
# Windows (PowerShell):
venv\Scripts\Activate.ps1

# 依存パッケージをインストール
pip install -r requirements.txt
```

---

## 3. Claude API キーの取得

1. https://console.anthropic.com/ にアクセス
2. アカウントを作成
3. 「Billing」からクレジットを最低 $5 購入
4. 「API Keys」→「Create Key」でキーを発行
5. `sk-ant-xxx...` で始まる文字列をコピー

---

## 4. X API キーの取得（Free tier）

### 4-1. 開発者アカウント作成

1. https://developer.x.com/ にアクセス
2. 自分のXアカウントでログイン
3. 「Sign up for Free Account」を選択
4. 利用目的を英語で記入（「自分のアカウントでの投稿自動化」で問題なし）

### 4-2. アプリ作成

1. Developer Portal → 「Projects & Apps」→「New Project」
2. Project名を適当に付ける（例: `my-x-bot`）
3. Use case: 「Making a bot」を選択
4. アプリを作成

### 4-3. 権限設定（超重要）

1. アプリの「Settings」→「User authentication settings」→「Set up」
2. **App permissions**: `Read and write` を選択
3. **Type of App**: `Web App, Automated App or Bot`
4. Callback URL: `http://localhost` と入力（使わないが必須）
5. Website URL: 適当な自分のURL（Xプロフィールでも可）
6. 保存

### 4-4. キー発行

1. アプリの「Keys and tokens」タブを開く
2. 以下の4つを発行してメモ
   - **API Key** (Consumer Keys)
   - **API Key Secret** (Consumer Keys)
   - **Access Token** (Authentication Tokens - 「Generate」)
   - **Access Token Secret**

⚠️ Access Token は**Read and Write 権限**で発行されていることを確認。
   権限設定を後から変えた場合、Token を再生成する必要あり。

---

## 5. .env ファイルの作成

```bash
cp .env.example .env
```

エディタで `.env` を開いて、4.で取得した X のキー、3.で取得した Claude API キーを貼り付ける。

```bash
ANTHROPIC_API_KEY=sk-ant-xxxxx...
X_API_KEY=xxxxx...
X_API_SECRET=xxxxx...
X_ACCESS_TOKEN=xxxxx...
X_ACCESS_TOKEN_SECRET=xxxxx...
X_USERNAME=your_handle  # @なしの自分のユーザー名
```

---

## 6. 動作確認

### 6-1. X API の接続確認

```bash
python -m src.cli test-x
```

`✅ X API 接続OK (@your_handle)` と出ればOK。

### 6-2. Claude API の接続確認

```bash
python -m src.cli test-claude
```

`✅ Claude API 接続OK` と出ればOK。

### 6-3. 投稿生成

```bash
python -m src.cli generate --count 3
```

`data/posts/pending/` に JSON ファイルが 3件できていれば成功。

### 6-4. 承認フロー

```bash
python -m src.cli review
```

生成された投稿が1件ずつ表示される。`y`=承認、`n`=却下、`e`=編集、`q`=中断。

### 6-5. 投稿実行

```bash
python -m src.cli publish
```

承認済みの投稿が X に投稿される。Free tier なので 1日10件まで（設定で変更可）。

---

## 7. Claude Code スキルの有効化（任意）

Claude Desktop で「Code」タブを開き、このリポジトリのフォルダを選ぶ。
すると `.claude/skills/` が自動認識され、自然言語で全工程を動かせる。

例:
- 「今日の投稿を5件生成して」 → `x-generate` スキルが発火
- 「承認キューをレビューさせて」 → `x-review` スキルが発火
- 「承認済みをすべて投稿して」 → `x-publish` スキルが発火

---

## トラブルシューティング

### `403 Forbidden` が返ってくる
→ X アプリの権限が `Read` のまま。`Read and Write` に変えて Access Token を**再生成**する。

### `429 Too Many Requests` が返ってくる
→ Free tier の月500ポスト制限に達している可能性。X Developer Portal の Usage から確認。

### `.env` を読んでくれない
→ 仮想環境を有効化しているか、コマンドをリポジトリのルートから実行しているか確認。

### Claude API で `insufficient credits`
→ console.anthropic.com の Billing からクレジットを追加。
