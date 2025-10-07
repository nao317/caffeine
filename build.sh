#!/bin/bash

# Laravel アプリケーションキーが未設定の場合に生成
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --no-interaction
fi

# データベースの初期化（SQLiteファイルが存在しない場合）
if [ ! -f database/database.sqlite ]; then
  touch database/database.sqlite
fi

# マイグレーション実行
php artisan migrate --force

# キャッシュクリア（本番環境の場合は必要に応じて）
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# アセットビルド
npm run build

# 本番用にキャッシュ生成
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Build completed successfully!"