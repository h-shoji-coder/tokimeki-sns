import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./db-types";

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

  // Supabase 未設定時は null を返す（デモモード）
  if (!url.includes("supabase.co") || !key.startsWith("eyJ")) {
    return null as unknown as ReturnType<typeof createServerClient<Database>>;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component からの呼び出しは無視（middleware でセッションを更新済み）
        }
      },
    },
  });
}
