# 妻向けセットアップ手順

このアカウントを実際に運営するのは妻です。
夫はあくまで技術面のサポートのみ。

## 0. 必要なもの

- 妻専用の Windows PC (またはMac)
- インターネット接続
- 妻名義のクレジットカード (各APIの少額決済用)
- 60〜90分の作業時間

## 1. 必要なアカウント (全部妻名義で)

### 1-1. X (旧Twitter) Developer
- [ ] https://x.com/ で妻のアカウントを新規作成 (または既存)
- [ ] https://developer.x.com/ で Developer 登録
- [ ] アプリ作成 → User authentication で **Read and write** を設定
  - Type of App: Web App, Automated App or Bot
  - Callback URI: `https://example.com`
  - Website URL: `https://example.com`
- [ ] OAuth 1.0a の Consumer Key / Secret / Access Token / Access Secret を取得
- [ ] Pay Per Use にクレカ登録 + $5 程度チャージ

### 1-2. Anthropic (Claude API)
- [ ] https://console.anthropic.com/ で登録
- [ ] Plans & Billing でクレカ登録 + $5〜$10 チャージ
- [ ] API Keys で `sk-ant-...` を取得

### 1-3. はてなブログ
- [ ] https://www.hatena.ne.jp/register で妻のはてなID作成
- [ ] はてなブログを開設 (無料プランでまず作る)
- [ ] **はてなブログPro** に契約 (月¥1,008、独自ドメイン化など機能解放)
- [ ] **編集モードを Markdown に変更**
  - ブログ管理画面 → 設定 → 基本設定 → 編集モード → Markdownモード
- [ ] AtomPub APIキー取得
  - 設定 → 詳細設定 → AtomPub
  - 「ルートエンドポイント」と「APIキー」を控える

### 1-4. 楽天アフィリエイト
- [ ] https://affiliate.rakuten.co.jp/ で楽天IDで登録 (即承認)
- [ ] アフィリエイトIDを控える (20桁の英数字、ドットで区切られた4ブロック)

### 1-5. 楽天ウェブサービス (商品検索API用)
- [ ] https://webservice.rakuten.co.jp/ で「アプリ新規作成」
  - アプリ名: 「家計レビュー」など適当でOK
  - URL: 自分のはてなブログのURL
- [ ] アプリIDを控える (19桁の数字)

### 1-6. (後回しでOK) Amazonアソシエイト
- 楽天で売上が出始めてから登録 (180日以内に売上3件の審査がある)

## 2. PCにツールをインストール

### Python と Git

すでに入っていなければインストール:

- Python: https://www.python.org/downloads/ → 「Add python.exe to PATH」にチェック
- Git: https://git-scm.com/download/win → デフォルト設定でOK

確認 (PowerShell で):
```powershell
python --version
git --version
```

### このリポジトリをクローン

```powershell
cd $HOME\Documents
git clone https://github.com/macsa2ki25-eng/SpecialAigent.git
cd SpecialAigent
```

### 仮想環境とライブラリ

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

実行ポリシーで止められたら:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

ライブラリインストール:
```powershell
pip install -r requirements.txt
```

## 3. .env ファイルを作成

```powershell
Copy-Item .env.example .env
notepad .env
```

メモ帳で以下を全部埋める (取得した実際の値に置き換える):

```
ANTHROPIC_API_KEY=sk-ant-xxxxx...
X_API_KEY=xxxxx...
X_API_SECRET=xxxxx...
X_ACCESS_TOKEN=xxxxx...
X_ACCESS_TOKEN_SECRET=xxxxx...
X_USERNAME=妻のXユーザー名 (@なし)
HATENA_USER_ID=妻のはてなID
HATENA_BLOG_DOMAIN=妻のはてなID.hatenablog.com
HATENA_API_KEY=xxxxx...
RAKUTEN_APPLICATION_ID=1234567890123456789
RAKUTEN_AFFILIATE_ID=00000000.00000000.00000000.00000000
```

保存して閉じる。

## 4. 疎通テスト (4つ全部)

```powershell
python -m src.cli test-claude
python -m src.cli test-x
python -m src.cli test-rakuten
python -m src.cli test-hatena
```

全部 `✅` が出たらセットアップ完了。

### よくあるエラー

**`SSL: CERTIFICATE_VERIFY_FAILED`**
→ セキュリティソフトがHTTPSを検査してる。`pip install pip-system-certs` で解決 (requirements.txtに含まれているので通常不要)

**`401 Unauthorized` (X)**
→ X APIキー4つのどれかが間違い、または `.env` に余計なスペース

**`403 Forbidden` (X)**
→ User Authentication が "Read only" のまま。"Read and write" に変更後、Access Token を再生成

**`Payment Required` (X)**
→ X Developer Console でクレジットを購入

## 5. 最初の投稿を作ってみる

サンプル商品 (ネコソギ) で動作確認:

```powershell
# X投稿+ブログ記事を生成
python -m src.cli generate --product necosogi-2025 --all

# 内容を確認 (まだ投稿されない)
python -m src.cli review

# y で承認、e で編集、n で却下

# 承認したものを公開
python -m src.cli publish --target all
```

## 6. これから自分の商品で運用

[PRODUCTS_GUIDE.md](./PRODUCTS_GUIDE.md) を見ながら `data/products.yaml` に
自分が買った商品を追加していく。
