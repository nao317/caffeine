#!/bin/bash

# 本番環境での起動前処理
echo "Starting Laravel application..."

# Laravel アプリケーションキーが未設定の場合に生成
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --no-interaction
fi

# データベースファイルの確認
if [ ! -f database/database.sqlite ]; then
  touch database/database.sqlite
fi

# ストレージディレクトリのパーミッション確認
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions  
mkdir -p storage/framework/views
mkdir -p storage/logs
mkdir -p bootstrap/cache

# Laravelアプリケーション起動
exec php artisan serve --host=0.0.0.0 --port=8080