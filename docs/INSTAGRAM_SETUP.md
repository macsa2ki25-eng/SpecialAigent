# Instagram 自動投稿セットアップ手順 (妻向け)

毎晩21:30に、知育カルーセル(5枚スワイプ画像)を妻のInstagramに自動投稿する仕組み。
妻のPCに関係なくクラウドで動く。

## ⚠️ 全体の流れ (所要 約60-90分)

1. Instagramアカウントを「ビジネス」に切り替え
2. Facebook ページを作る
3. Instagram と Facebook ページを連携
4. Meta for Developers でアプリ作成
5. 長期アクセストークン取得
6. Instagram ビジネスアカウント ID を取得
7. GitHub Secrets に登録
8. テスト投稿

## 1. Instagramビジネスアカウントへの切り替え

スマホのInstagramアプリで:

1. プロフィール → 右上 ☰ → **設定とアクティビティ**
2. **アカウントの種類とツール** → **プロアカウントに切り替える**
3. カテゴリ選択: 「教育」「ファミリー」など子育て系
4. **ビジネス**(または クリエイター) を選ぶ
5. メールアドレス・電話番号は任意で公開設定

## 2. Facebook ページを作る

スマホブラウザ or PCブラウザで https://www.facebook.com/pages/create にアクセス:

1. ページ名: 妻のインスタアカウント名と同じが無難 (例: 「ゆるく知育のヒント」)
2. カテゴリ: 「ブロガー」または「教育サイト」
3. 説明: 任意 (空でもOK)
4. 「作成」

## 3. Instagram と Facebook ページを連携

Instagramアプリで:

1. プロフィール → **編集**
2. **公開ビジネス情報** → **ページ**
3. 作ったFacebookページを選んで連携

Facebook側で確認:
1. https://business.facebook.com/ にログイン
2. 設定 → アカウント → Instagramアカウント
3. 妻のInstagramが連携されているか確認

## 4. Meta for Developers でアプリ作成

1. https://developers.facebook.com/ にアクセス
2. 右上「マイアプリ」→ **アプリを作成**
3. ユースケース: **その他** を選択
4. アプリタイプ: **ビジネス**
5. アプリ名: `Chiiku Auto Post` など適当に
6. アプリ管理者メール: 妻のアドレス
7. **作成**

### 必要な製品を追加

アプリのダッシュボードで:

1. 左メニュー「製品を追加」
2. **Instagram Graph API** の「設定」をクリック
3. 利用規約に同意

### App Mode の確認

「開発」モードのままでも、自分のアカウントへの投稿はOK (本番モードへの移行は不要)。

## 5. 長期アクセストークン取得

ここが一番面倒です。**60日有効のトークン**を取得します。

### ステップ5-1. Graph API Explorer で短期トークンを取得

1. https://developers.facebook.com/tools/explorer/ にアクセス
2. アプリを選択 (作ったやつ)
3. 「ユーザートークンを生成」
4. 必要な権限 (Permissions) にチェック:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
   - `business_management`
5. **Generate Access Token** ボタン → ログイン → 権限許可
6. 表示された短期トークンを **コピー** (1〜2時間で失効)

### ステップ5-2. 短期 → 長期 トークンに変換 (60日有効)

ブラウザで以下のURLを叩く (`{xxx}` は置換):

```
https://graph.facebook.com/v23.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id={APP_ID}&
  client_secret={APP_SECRET}&
  fb_exchange_token={SHORT_TOKEN}
```

- APP_ID / APP_SECRET: Meta アプリのダッシュボード「設定 → ベーシック」で確認
- SHORT_TOKEN: 5-1 で取得したやつ

返ってくる JSON の `access_token` の値が **60日有効の長期トークン**。これを大事にメモ。

⚠️ **60日後に再生成が必要**。期限が切れたら自動投稿が止まります。
カレンダーリマインダー推奨。

## 6. Instagram ビジネスアカウント ID を取得

Graph API Explorer で:

```
GET /me/accounts
```

→ 自分のFBページ一覧が返ってくる。連携してるページの `id` をメモ (Page ID)。

次に:

```
GET /{PAGE_ID}?fields=instagram_business_account
```

→ `instagram_business_account.id` の値がInstagramビジネスアカウントID (15-17桁)。これをメモ。

## 7. GitHub Secrets に登録

ブラウザで:

```
https://github.com/macsa2ki25-eng/SpecialAigent/settings/secrets/actions
```

「New repository secret」で以下を登録:

| Name | Value |
|---|---|
| `INSTAGRAM_BUSINESS_ID` | 6で取得した15-17桁の数字 |
| `INSTAGRAM_ACCESS_TOKEN` | 5-2で取得した長期トークン |

(X用のSecretsは既に登録済みのはず)

## 8. テスト投稿

ブラウザで:

```
https://github.com/macsa2ki25-eng/SpecialAigent/actions/workflows/auto-post-instagram.yml
```

→ 「Run workflow」→ ブランチ選択 → `dry_run` を **true** にチェック → 実行

数十秒で結果が出る。**dry-run** なので画像は生成されるが投稿はされない。
Actions のログで生成されたキャプション・スライド構造を確認できる。

問題なければ `dry_run` を **false** にして実投稿テスト。

## 9. 自動稼働

毎日21:30 JSTに自動的に1投稿される。
内容を見て調整したくなったら `data/chiiku_topics.yaml` を編集すればOK。

## トラブルシューティング

### `(#10) Application does not have permission for this action`
→ ステップ5-1の権限が不足。権限を全部付けて再取得。

### `(#100) Invalid parameter` (image_url)
→ 画像URLにIGがアクセスできない。リポジトリが**Public**か確認。
   Privateなら IMAGE_HOSTING を `imgbb` に変更 (詳細は別途)。

### `(#190) Error validating access token`
→ トークン期限切れ。ステップ5を再実行。

### 投稿はされたが画像が映らない
→ 画像のサイズ・形式を確認 (PNG, 1080x1080推奨)。
   Privateリポジトリだと raw URL にアクセスできないので、Publicに変更必須。

### dry-run で画像生成が失敗
→ Yusei Magic フォントが GitHub Actions の実行環境にダウンロードできているか確認。
   `src/image_gen.py` の `ensure_font()` がGoogle FontsにアクセスできればOK。

### 60日後トークン切れ
→ ステップ5を再度実行。または、自動更新のしくみを後日追加することも可能。

## 補足: 公開リポジトリにすべきか

GitHub Actions で `IMAGE_HOSTING=github_raw` を使うには、**リポジトリがPublic**である必要がある (raw.githubusercontent.com にIG が外部からアクセスできるため)。

Public にすると:
- 画像と投稿履歴が誰でも見れる (大した情報ではない)
- ただし `.env` は `.gitignore` で守られているので、APIキーは漏れない

Private のままにしたい場合は、IMAGE_HOSTING=imgbb に切り替えて、imgbbのAPIキーを別途登録する。
