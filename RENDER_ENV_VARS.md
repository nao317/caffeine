# Render Environment Variables for Production

# 必須設定
APP_NAME=Caffeine
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:m47P1fipnc1ZmkGHAmMPeyPAQUiIv0hwXOmCyK+9VyM=
APP_URL=https://your-app-name.onrender.com

# データベース
DB_CONNECTION=sqlite

# セッション
SESSION_DRIVER=file
SESSION_LIFETIME=120

# キューとキャッシュ
QUEUE_CONNECTION=sync
CACHE_STORE=file

# ログ
LOG_CHANNEL=stack
LOG_LEVEL=error

# Supabase
VITE_SUPABASE_URL=https://lyekajendyjtenqtsikw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZWthamVuZHlqdGVucXRzaWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NzcwOTIsImV4cCI6MjA3MzU1MzA5Mn0.LXOWMpdNiP-t9lVk20zuOQaIA5_-GcLUJF2TTavzR6E
VITE_APP_NAME=Caffeine

# 注意事項：
# - APP_URLはRenderで割り当てられた実際のURLに変更してください
# - APP_KEYは本番用に新しいキーを生成することを推奨します（php artisan key:generate）
# - APP_DEBUGはtrueにすると詳細なエラー情報が表示されます（デバッグ時のみ）