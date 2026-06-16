"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { createServiceRoleClient } from "./service-role";

export async function getSupabaseUserByClerkId() {
  const { userId } = await auth();
  if (!userId) return null;

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
 * Protected レイアウト・Server Actions の先頭で呼び出す
 */
export async function ensureSupabaseUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

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
