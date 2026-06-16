import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, { ok: boolean; message: string }> = {};

  // Clerk チェック
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  checks.clerk = {
    ok: clerkKey.startsWith("pk_"),
    message: clerkKey.startsWith("pk_")
      ? "Publishable key が設定済み"
      : "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY が未設定またはプレースホルダーです",
  };

  // Supabase チェック
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  checks.supabase_url = {
    ok: supabaseUrl.includes(".supabase.co"),
    message: supabaseUrl.includes(".supabase.co")
      ? `URL 設定済み: ${supabaseUrl}`
      : "NEXT_PUBLIC_SUPABASE_URL が未設定です",
  };

  checks.supabase_anon = {
    ok: supabaseKey.startsWith("eyJ"),
    message: supabaseKey.startsWith("eyJ")
      ? "anon key 設定済み"
      : "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY が未設定です",
  };

  checks.supabase_service = {
    ok: serviceKey.startsWith("eyJ"),
    message: serviceKey.startsWith("eyJ")
      ? "service_role key 設定済み"
      : "SUPABASE_SERVICE_ROLE_KEY が未設定です",
  };

  // Supabase 接続テスト（設定済みの場合のみ）
  if (checks.supabase_url.ok && checks.supabase_anon.ok) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("users").select("id").limit(1);
      checks.supabase_db = {
        ok: !error,
        message: error
          ? `DB接続エラー: ${error.message}（マイグレーション未実行の可能性）`
          : "DB接続 OK（users テーブルにアクセスできます）",
      };
    } catch (e) {
      checks.supabase_db = {
        ok: false,
        message: `DB接続テスト失敗: ${e}`,
      };
    }
  }

  const allOk = Object.values(checks).every((c) => c.ok);

  return NextResponse.json(
    {
      status: allOk ? "healthy" : "unhealthy",
      app: "ときめき 婚活SNS",
      timestamp: new Date().toISOString(),
      checks,
      next_steps: allOk
        ? ["✅ すべての設定が完了しています！アプリを使い始められます。"]
        : [
            "1. .env.local に Clerk API Keys を設定",
            "2. .env.local に Supabase Keys を設定",
            "3. Supabase SQL Editor でマイグレーションを実行",
            "4. http://localhost:3000/api/health で再確認",
          ],
    },
    { status: allOk ? 200 : 503 }
  );
}
