# Vercelへのデプロイ手順

## 方法1: GitHub連携（推奨）

### 1. Vercelアカウントにログイン
https://vercel.com にアクセスしてログイン

### 2. 新しいプロジェクトを追加
- 「Add New Project」をクリック
- GitHubリポジトリ「takayukey009/artist-contact-form」を選択
- 「Import」をクリック

### 3. プロジェクト設定
- **Framework Preset**: Vite を選択（自動検出されるはず）
- **Root Directory**: そのまま（デフォルト）
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

### 4. 環境変数の設定
以下の環境変数を追加してください:

**必須の環境変数**:
- `DATABASE_URL`: MySQL/TiDBの接続文字列
- `JWT_SECRET`: ランダムな文字列（セッション署名用）
- `VITE_APP_ID`: Manus OAuth アプリケーションID
- `OAUTH_SERVER_URL`: Manus OAuth サーバーURL
- `VITE_OAUTH_PORTAL_URL`: Manus ログインポータルURL
- `OWNER_OPEN_ID`: オーナーのOpenID
- `OWNER_NAME`: オーナー名
- `VITE_APP_TITLE`: アプリケーションタイトル
- `VITE_APP_LOGO`: アプリケーションロゴURL
- `BUILT_IN_FORGE_API_URL`: Manus内部API URL
- `BUILT_IN_FORGE_API_KEY`: Manus内部APIキー

### 5. デプロイ
「Deploy」ボタンをクリックしてデプロイを開始

### 6. 自動デプロイの設定
デプロイ完了後、GitHubリポジトリにプッシュするたびに自動的にデプロイされます。

---

## 方法2: Vercel CLI

### 1. Vercel CLIでログイン
```bash
vercel login
```

### 2. プロジェクトをデプロイ
```bash
cd /home/ubuntu/artist-contact-form
vercel
```

### 3. 環境変数の設定
Vercelダッシュボードまたは以下のコマンドで環境変数を設定:
```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
# その他の環境変数も同様に追加
```

### 4. 本番環境へデプロイ
```bash
vercel --prod
```

---

## 注意事項

1. **データベース接続**: Vercelからアクセス可能なMySQLデータベースが必要です
2. **環境変数**: すべての必須環境変数を設定しないとアプリケーションが正しく動作しません
3. **Gmail MCP**: デプロイ後、Gmail送信機能はサーバーサイドで動作するため、MCPサーバーへのアクセスが必要です

## GitHubリポジトリ
https://github.com/takayukey009/artist-contact-form

