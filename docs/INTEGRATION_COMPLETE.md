# ✅ Supabase + Clerk + Vercel 統合完了レポート

実装日: 2026-06-16

---

## 📦 インストールされたパッケージ

| パッケージ | 用途 |
|---|---|
| `@clerk/nextjs` | 認証（サインイン・サインアップ・ユーザー管理） |
| `@supabase/supabase-js` | Supabase クライアント |
| `@supabase/ssr` | SSR 対応 Supabase クライアント |
| `zod` | フォームバリデーション |

---

## 🗄️ データベース構造

### 作成されたテーブル（`supabase/migrations/20260616000000_create_tokimeki_schema.sql`）

| テーブル | 説明 |
|---|---|
| `users` | ユーザープロフィール（Clerk と同期） |
| `posts` | タイムライン投稿 |
| `post_likes` | 投稿へのいいね |
| `user_likes` | スワイプ型いいね |
| `matches` | マッチング成立記録 |
| `diagnosis_results` | 恋愛タイプ診断結果 |

すべてのテーブルで **RLS（Row Level Security）** が有効化されています。

---

## 🔐 認証フロー

```
ユーザーアクセス
    ↓
middleware.ts（clerkMiddleware）
    ↓ 未認証
/sign-in → Clerk 認証画面
    ↓ 認証成功
/home（Protected Layout）
    ↓
ensureSupabaseUser() → Supabase users テーブルに自動同期
    ↓
アプリ本体
```

---

## 📁 生成されたファイル

```
middleware.ts                          ← clerkMiddleware + Supabase セッション更新
app/layout.tsx                         ← ClerkProvider でラップ
app/sign-in/[[...sign-in]]/page.tsx    ← サインインページ
app/sign-up/[[...sign-up]]/page.tsx    ← サインアップページ
app/(app)/layout.tsx                   ← Protected レイアウト（ensureSupabaseUser）
app/(app)/home/HomeClient.tsx          ← 投稿ボタン（Client Component）
app/(app)/home/CreatePostForm.tsx      ← 投稿フォーム（Server Actions使用）
app/actions/posts.ts                   ← 投稿・いいね Server Actions
app/actions/users.ts                   ← プロフィール・診断・マッチング Server Actions
lib/supabase/client.ts                 ← ブラウザクライアント
lib/supabase/server.ts                 ← サーバークライアント
lib/supabase/service-role.ts           ← サービスロールクライアント（サーバー専用）
lib/supabase/db-types.ts               ← TypeScript 型定義
lib/supabase/auth-helpers.ts           ← ensureSupabaseUser ユーティリティ
supabase/migrations/                   ← データベースマイグレーション SQL
.env.local.example                     ← 環境変数テンプレート
```

---

## 👤 あなたが実行すべき手順

### ステップ 1: Clerk の設定

1. https://dashboard.clerk.com/ にアクセス
2. 新しいアプリケーションを作成
3. **「API Keys」** から以下を取得:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. **「Paths」** で以下を設定:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/home`
   - After sign-up: `/home`

### ステップ 2: Supabase の設定

1. https://supabase.com/dashboard にアクセスしてプロジェクトを作成
2. **「Settings → API」** から以下を取得:
   - `NEXT_PUBLIC_SUPABASE_URL`（Project URL）
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`（anon public）
   - `SUPABASE_SERVICE_ROLE_KEY`（service_role）⚠️ 秘密！
3. **「SQL Editor」** を開いて `supabase/migrations/20260616000000_create_tokimeki_schema.sql` の内容を貼り付けて実行

### ステップ 3: 環境変数の設定

```bash
# .env.local.example をコピー
copy .env.local.example .env.local
# 取得した値を .env.local に書き込む
```

### ステップ 4: Vercel へのデプロイ

```bash
# Vercel CLI でデプロイ
npx vercel

# または GitHub リポジトリを Vercel に連携
# Vercel Dashboard → Settings → Environment Variables に
# .env.local の内容をすべて追加
```

### ステップ 5: Clerk の本番設定

- Vercel デプロイ後の URL を Clerk Dashboard の Allowed Origins に追加
- 例: `https://tokimeki.vercel.app`

---

## 🔧 トラブルシューティング

| 問題 | 解決方法 |
|---|---|
| ログインできない | Clerk の API Keys と Redirect URLs を確認 |
| Supabase に接続できない | `NEXT_PUBLIC_SUPABASE_URL` の末尾スラッシュを削除 |
| RLS エラー | Supabase Dashboard → Logs でポリシーを確認 |
| ユーザーが同期されない | `SUPABASE_SERVICE_ROLE_KEY` が正しく設定されているか確認 |

---

## 📝 次のステップ（フェーズ 2）

- [ ] プロフィール画像アップロード（Supabase Storage）
- [ ] リアルタイムメッセージ（Supabase Realtime）
- [ ] プレミアムプラン決済（Stripe）
- [ ] プッシュ通知（Web Push API）
- [ ] AIマッチング推薦（OpenAI API）
