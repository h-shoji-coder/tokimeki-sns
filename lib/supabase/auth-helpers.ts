"use server";

import { DEMO_USER, isDemoMode } from "@/lib/demo-mode";

export async function getSupabaseUserByClerkId() {
  if (isDemoMode()) return DEMO_USER;

  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) return null;

  const { createServiceRoleClient } = await import("./service-role");
  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  return data ?? null;
}

/**
 * Clerk ユーザーを Supabase users テーブルに自動同期
 * デモモード時はダミーユーザーを返す
 */
export async function ensureSupabaseUser() {
  if (isDemoMode()) return DEMO_USER;

  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const { createServiceRoleClient } = await import("./service-role");
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        clerk_user_id: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        full_name:
          `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() ||
          null,
        avatar_url: clerkUser.imageUrl ?? null,
      },
      { onConflict: "clerk_user_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("[ensureSupabaseUser] error:", error.message);
    return null;
  }
  return data;
}
