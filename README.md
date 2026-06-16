# 💕 ときめき - 婚活SNS

バズる婚活SNS。恋愛診断・スワイプマッチング・タイムライン・ランキングが揃った Next.js アプリ。

[![CI](https://github.com/h-shoji-coder/tokimeki-sns/actions/workflows/ci.yml/badge.svg)](https://github.com/h-shoji-coder/tokimeki-sns/actions)

---

## 🚀 セットアップ（3ステップ）

### ステップ 1: API キーを取得して .env.local に貼り付け

```env
# .env.local

# Clerk → https://dashboard.clerk.com/ → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxx

# Supabase → https://supabase.com/dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxxxx
```

### ステップ 2: セットアップスクリプトを実行

```powershell
./setup.ps1
```

このスクリプトが自動で行うこと：
- ✅ 環境変数の入力チェック
- ✅ npm install
- ✅ TypeScript 型チェック
- ✅ Supabase SQL をクリップボードにコピー＆ブラウザで SQL Editor を開く
- ✅ 開発サーバー起動

### ステップ 3: Supabase マイグレーションを実行

スクリプトが自動でブラウザを開き、SQLをクリップボードにコピーします。  
Supabase SQL Editor に貼り付けて「Run」をクリックするだけです。

---

## ✅ 動作確認

セットアップ後、以下の URL で全サービスの接続状態を確認できます：

```
http://localhost:3000/api/health
```

レスポンス例（すべて OK の場合）：
```json
{
  "status": "healthy",
  "checks": {
    "clerk": { "ok": true },
    "supabase_url": { "ok": true },
    "supabase_anon": { "ok": true },
    "supabase_service": { "ok": true },
    "supabase_db": { "ok": true }
  }
}
```

---

## 🌐 Vercel デプロイ

```bash
npx vercel
```

Vercel Dashboard → Settings → Environment Variables に `.env.local` の内容をすべて追加してください。

---

## 🛠️ 技術スタック

| 技術 | 用途 |
|---|---|
| Next.js 15 (App Router) | フロントエンド・SSR |
| TypeScript | 型安全な開発 |
| Tailwind CSS v4 | スタイリング |
| Clerk | 認証（Google OAuth） |
| Supabase (PostgreSQL) | データベース・RLS |
| Vercel | ホスティング |

## 📁 主要ファイル

```
app/
├── (app)/          # 認証保護されたページ群
│   ├── home/       # タイムライン
│   ├── discover/   # スワイプマッチング
│   ├── diagnosis/  # 恋愛タイプ診断
│   ├── ranking/    # ランキング
│   └── mypage/     # マイプロフィール
├── api/health/     # 接続確認 API
├── sign-in/        # Clerk サインイン
└── sign-up/        # Clerk サインアップ
lib/supabase/       # Supabase クライアント・型定義
supabase/migrations/ # DBマイグレーション SQL
```
