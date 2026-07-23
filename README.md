# ぽちっと電子名刺

鎌田エリ子の公開用電子名刺です。React + Vite の静的サイトとして構成しており、
`chatgpt.site`、ChatGPTログイン、OpenAI Sitesの実行環境には依存しません。
Cloudflare PagesへGitHub連携で公開できます。

## ローカルで確認する

必要環境: Node.js 22.13以降

```bash
npm ci
cp .env.example .env.local
npm run dev
```

`.env.local` の `VITE_GAS_API_URL` を実際のGAS本番URLに変更してください。

本番相当のビルド確認:

```bash
npm run test
npm run preview
```

## 環境変数

| 変数名 | 必須 | 用途 | 設定例 |
|---|---:|---|---|
| `VITE_GAS_API_URL` | 必須 | 問い合わせを受け取るGAS Webアプリの本番 `/exec` URL | `https://script.google.com/macros/s/.../exec` |

`VITE_` で始まる値はビルド済みJavaScriptから参照可能です。URL以外の秘密情報、
APIキー、パスワードは設定しないでください。

## GAS Webアプリの本番設定

問い合わせフォームは `application/x-www-form-urlencoded` 形式で次の項目をPOSTします。

- `name`: お名前
- `company`: 会社名・屋号
- `email`: メールアドレス
- `phone`: 電話番号
- `message`: 相談内容
- `source`: `pochitto-digital-business-card`

GAS側では `doPost(e)` で `e.parameter` を読み取ります。デプロイ時は次を設定します。

1. GASの「デプロイ」→「新しいデプロイ」→「ウェブアプリ」を選択
2. 実行ユーザーを所有者に設定
3. アクセスできるユーザーを「全員」に設定
4. 発行されたURLが `/exec` で終わることを確認
5. テスト用 `/dev` URLではなく、その `/exec` URLをCloudflareへ設定

ブラウザからGASへ直接送るため、クライアントは `no-cors` で送信します。GAS側で
入力検証、保存、通知、スパム対策を行ってください。`no-cors` ではブラウザがGASの
レスポンス本文を読めないため、画面の送信完了は「リクエストを送出できた」ことを
示します。実際の保存確認はGAS側ログまたは保存先で行います。

## GitHubへ保存する

初回のみGitHubで空のリポジトリを作成し、ローカルで次を実行します。

```bash
git add .
git commit -m "Prepare production deployment for Cloudflare Pages"
git branch -M main
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

`.env.local`、`node_modules`、`dist`、ChatGPT Sites用ファイル、過去の公開用アーカイブは
Gitの対象外です。

## Cloudflare Pagesへ本番公開する

Cloudflareダッシュボードの「Workers & Pages」からPagesプロジェクトを作成し、
GitHubリポジトリを接続します。

### ビルド設定

| 項目 | 値 |
|---|---|
| Framework preset | `Vite` |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node.js version | `22.13.0` 以上 |

「Settings」→「Environment variables」で、本番環境と必要に応じてPreview環境へ
`VITE_GAS_API_URL` を登録します。本番には必ずGASの `/exec` URLを設定してください。
保存後、最新コミットを再デプロイします。

## 公開後の動作確認

- [ ] Cloudflareの公開URLをシークレットウィンドウで開ける
- [ ] ChatGPTまたはGoogleへのログインを求められない
- [ ] PCとスマートフォンでレイアウト、色、文字、余白が崩れていない
- [ ] ページ内リンクが該当セクションへ移動する
- [ ] 「連絡先を保存」で `kamada-eriko.vcf` を取得できる
- [ ] LINE、Instagram、Website、Emailの各リンクが開く
- [ ] QRコードを表示でき、読み取ると現在のCloudflare URLが開く
- [ ] 必須項目とメール形式のブラウザ検証が働く
- [ ] 問い合わせ送信後に完了表示へ切り替わる
- [ ] GASの実行ログまたは保存先に全フォーム項目と `source` が届く
- [ ] GAS未設定時に送信先未設定のエラーが表示される
- [ ] 存在しないパスへのアクセスがトップページへ戻る
- [ ] ブラウザのコンソールに重大なエラーがない

## 主な構成

- `app/page.tsx`: 画面とフォーム送信処理
- `app/globals.css`: 既存デザイン
- `src/main.tsx`: Viteの起動点
- `public/_headers`: Cloudflare Pagesのセキュリティヘッダー
- `public/_redirects`: SPAのフォールバック
- `.env.example`: 必要環境変数の見本
