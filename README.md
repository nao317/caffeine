# ☕ Caffeine

コーヒーやカフェ体験をシェアするソーシャルプラットフォーム

## Concept / Description

**Caffeine**は、コーヒー愛好家とカフェ愛好者のためのソーシャルプラットフォームです。お気に入りのカフェや特別なコーヒー体験を写真付きで投稿し、コミュニティと共有できます。

### 主な機能
- **画像付き投稿**: カフェやコーヒーの写真と体験をシェア
- **プロフィール管理**: アバター画像、ユーザー名、自己紹介の設定
- **ダッシュボード**: 投稿の一覧表示と新規投稿
- **認証システム**: Supabaseを使用したセキュアな認証

## Architecture

### Tech Stack

#### Backend
- **Laravel 12.32.5** - PHPフレームワーク
- **Inertia.js 2.0** - SPA体験を提供するフルスタックフレームワーク
- **PHP 8.2+** - サーバーサイド言語

#### Frontend
- **React 19.0.0** - ユーザーインターフェース
- **TypeScript** - 型安全な開発
- **Tailwind CSS 4.0** - ユーティリティファーストCSSフレームワーク
- **Vite 7.1.9** - 高速ビルドツール

#### Database & Storage
- **Supabase** - PostgreSQLデータベース、認証、ファイルストレージ
- **SQLite** - ローカル開発用データベース

#### Deployment
- **Docker** - コンテナ化
- **Render** - 本番環境デプロイ

### Project Structure

```
caffeine/
├── app/                    # Laravel アプリケーションロジック
│   ├── Http/Controllers/   # コントローラー
│   ├── Models/            # Eloquent モデル
│   └── Providers/         # サービスプロバイダー
├── resources/
│   ├── js/                # React アプリケーション
│   │   ├── components/    # 再利用可能コンポーネント
│   │   │   ├── header.tsx
│   │   │   ├── postcard.tsx
│   │   │   ├── postform.tsx
│   │   │   └── postlist.tsx
│   │   ├── pages/         # ページコンポーネント
│   │   │   ├── auth/      # 認証関連ページ
│   │   │   ├── dashboard.tsx
│   │   │   ├── home.tsx
│   │   │   └── profile.tsx
│   │   ├── lib/           # ユーティリティライブラリ
│   │   │   ├── supabase.ts
│   │   │   └── uploadImage.ts
│   │   └── types/         # TypeScript型定義
│   ├── css/               # スタイルシート
│   └── views/             # Blade テンプレート
├── routes/                # ルート定義
├── database/              # データベース関連
│   ├── migrations/        # マイグレーション
│   └── seeders/          # シーダー
├── public/                # 公開ファイル
└── docker-compose.yml     # Docker 設定
```

## Getting Started

### Prerequisites

- PHP 8.2+
- Node.js 20.x+
- Composer
- Docker (optional)

### Installation

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/nao317/caffeine.git
   cd caffeine
   ```

2. **依存関係のインストール**
   ```bash
   # PHP依存関係
   composer install
   
   # Node.js依存関係
   npm install
   ```

3. **環境設定**
   ```bash
   # 環境ファイルをコピー
   cp .env.example .env
   
   # アプリケーションキーを生成
   php artisan key:generate
   ```

4. **Supabaseプロジェクトの設定**
   - [Supabase](https://supabase.com)でプロジェクトを作成
   - `.env`ファイルに以下を設定:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   DB_CONNECTION=pgsql
   DB_HOST=db.your-project.supabase.co
   DB_DATABASE=postgres
   DB_USERNAME=postgres
   DB_PASSWORD=your-database-password
   ```

5. **データベースマイグレーション**
   ```bash
   php artisan migrate
   ```

6. **アセットビルド**
   ```bash
   npm run build
   ```

### Development

```bash
# Laravel開発サーバー起動
php artisan serve

# フロントエンドの開発モード（別ターミナル）
npm run dev
```

### Docker での起動

```bash
# Docker コンテナでの起動
docker-compose up -d

# アプリケーション起動
docker-compose exec app php artisan serve --host=0.0.0.0
```

## Features

### ホームページ
- アプリケーションの紹介
- ログイン・サインアップへの導線

### 認証システム
- **サインアップ**: 新規ユーザー登録とプロフィール作成
- **ログイン**: メールアドレスとパスワードでログイン
- **ログアウト**: セキュアなログアウト機能

### ダッシュボード
- 全ユーザーの投稿一覧表示
- 新規投稿作成フォーム
- 画像アップロード機能
- リアルタイム投稿更新

### プロフィール管理
- アバター画像の変更
- ユーザー名と自己紹介の編集
- プロフィール情報の表示

### 投稿機能
- テキストと画像の投稿
- Supabaseストレージへの画像アップロード
- 投稿一覧の表示

## Development Scripts

```bash
# フロントエンド開発
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run build:ssr    # SSRビルド

# コード品質
npm run lint         # ESLint実行
npm run format       # Prettier実行
npm run format:check # フォーマットチェック
npm run types        # TypeScriptタイプチェック

# Laravel
php artisan serve    # 開発サーバー
php artisan migrate  # マイグレーション実行
php artisan tinker   # REPL起動
```

## Deployment

### Render でのデプロイ

1. **環境変数の設定** (Renderダッシュボード)
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=your-production-key
   APP_URL=https://your-app.onrender.com
   
   # Supabase設定
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # データベース設定
   DB_CONNECTION=pgsql
   DB_HOST=db.your-project.supabase.co
   DB_DATABASE=postgres
   DB_USERNAME=postgres
   DB_PASSWORD=your-database-password
   ```

2. **ビルド設定**
   - Build Command: `./build.sh`
   - Start Command: `./start.sh`

## Contributing

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## License

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## Links

- **Repository**: [https://github.com/nao317/caffeine](https://github.com/nao317/caffeine)
- **Issues**: [https://github.com/nao317/caffeine/issues](https://github.com/nao317/caffeine/issues)

---

⭐ このプロジェクトが気に入ったらスターをつけてください！