import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./db-types";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

  if (!url.includes("supabase.co") || !key.startsWith("eyJ")) {
    return null as unknown as ReturnType<typeof createBrowserClient<Database>>;
  }

  return createBrowserClient<Database>(url, key);
}
