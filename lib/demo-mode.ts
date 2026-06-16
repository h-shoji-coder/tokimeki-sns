/**
 * デモモード判定
 * Clerk / Supabase のキーが未設定またはプレースホルダーの場合は true
 */

/** ASCII 英数字・記号のみで構成された十分な長さのキーかどうかを確認 */
function isRealKey(key: string, minLen = 30): boolean {
  return key.length >= minLen && /^[\x20-\x7E]+$/.test(key);
}

export function isClerkConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  return (
    (key.startsWith("pk_test_") || key.startsWith("pk_live_")) &&
    isRealKey(key, 40)
  );
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
  return (
    url.includes(".supabase.co") &&
    isRealKey(url, 30) &&
    key.startsWith("eyJ") &&
    isRealKey(key, 100)
  );
}

export function isDemoMode(): boolean {
  return !isClerkConfigured() || !isSupabaseConfigured();
}

/** デモ用ダミーユーザー */
export const DEMO_USER = {
  id: "demo-user-001",
  clerk_user_id: "demo_clerk_id",
  email: "demo@tokimeki.app",
  full_name: "さくら デモ",
  avatar_url:
    "https://api.dicebear.com/9.x/personas/svg?seed=demo&backgroundColor=fce7f3",
  bio: "これはデモモードです。実際のキーを設定するとフル機能が使えます✨",
  age: 28,
  gender: "female" as const,
  location: "東京",
  job: "マーケター",
  hobbies: ["カフェ巡り", "映画", "旅行"],
  love_type: "romantic" as const,
  liked_count: 42,
  matched_count: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
