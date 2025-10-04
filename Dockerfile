FROM php:8.2-cli

# Node.jsのインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && apt-get install -y \
    unzip libpq-dev libzip-dev zip git nodejs \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Composerのインストール
RUN composer install --no-dev --optimize-autoloader

# Node.jsの依存関係をインストール（開発依存関係も含む）
RUN npm ci

# フロントエンドアセットをビルド
RUN npm run build

# 開発依存関係を削除してサイズを削減
RUN npm prune --production

# Render が 8080 を見に行くので artisan serve を使う
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
