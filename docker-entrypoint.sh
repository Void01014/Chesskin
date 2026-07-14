#!/bin/sh

# Fix line endings just in case this was created on Windows
sed -i 's/\r$//' "$0"

echo "Running migrations..."
php artisan migrate --force

echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting Apache server..."
apache2-foreground
