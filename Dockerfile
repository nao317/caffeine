FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    unzip libpq-dev libzip-dev zip git \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader

# Render が 8080 を見に行くので artisan serve を使う
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
