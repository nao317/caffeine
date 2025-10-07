FROM php:8.2-cli

# Node.jsのインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && apt-get install -y \
    unzip libpq-dev libzip-dev zip git nodejs \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# 本番環境設定
ENV APP_ENV=production
ENV APP_DEBUG=false

# Composerのインストール（本番用）
RUN composer install --no-dev --optimize-autoloader

# Node.jsの依存関係をインストール
RUN npm ci

# フロントエンドアセットをビルド
RUN npm run build

# 開発依存関係を削除してサイズを削減
RUN npm prune --production

# キャッシュ最適化
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

# パーミッション設定とディレクトリ作成
RUN mkdir -p /app/storage/framework/cache \
    /app/storage/framework/sessions \
    /app/storage/framework/views \
    /app/storage/logs \
    /app/bootstrap/cache && \
    chown -R www-data:www-data /app/storage /app/bootstrap/cache && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# スタートスクリプトを使用
CMD ["./start.sh"]
