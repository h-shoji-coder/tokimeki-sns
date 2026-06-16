"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";
import { isDemoMode } from "@/lib/demo-mode";
import type { LoveType } from "@/lib/supabase/db-types";

const updateProfileSchema = z.object({
  bio: z.string().max(200, "200文字以内で入力してください").optional(),
  age: z.coerce
    .number()
    .int()
    .min(18, "18歳以上である必要があります")
    .max(99)
    .optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  location: z.string().max(50).optional(),
  job: z.string().max(50).optional(),
});

export async function updateProfile(formData: FormData) {
  const user = await ensureSupabaseUser();
  if (!user) return { error: "ログインが必要です" };
  if (isDemoMode()) return { success: true };

  const raw = {
    bio: (formData.get("bio") as string) || undefined,
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    gender:
      (formData.get("gender") as "male" | "female" | "other") || undefined,
    location: (formData.get("location") as string) || undefined,
    job: (formData.get("job") as string) || undefined,
  };

  const parsed = updateProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { createServiceRoleClient } = await import(
    "@/lib/supabase/service-role"
  );
  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("users")
    .update(parsed.data)
    .eq("id", user.id);

  if (error) {
    console.error("[updateProfile] error:", error.message);
    return { error: "プロフィールの更新に失敗しました。" };
  }

  revalidatePath("/mypage");
  return { success: true };
}

export async function saveDiagnosisResult(loveType: LoveType) {
  const user = await ensureSupabaseUser();
  if (!user) return { error: "ログインが必要です" };
  if (isDemoMode()) {
    revalidatePath("/mypage");
    return { success: true };
  }

  const { createServiceRoleClient } = await import(
    "@/lib/supabase/service-role"
  );
  const supabase = createServiceRoleClient();

  await supabase.from("diagnosis_results").insert({
    user_id: user.id,
    love_type: loveType,
  });

  await supabase
    .from("users")
    .update({ love_type: loveType })
    .eq("id", user.id);

  revalidatePath("/mypage");
  revalidatePath("/diagnosis/result");
  return { success: true };
}

export async function sendUserLike(toUserId: string) {
  const user = await ensureSupabaseUser();
  if (!user) return { error: "ログインが必要です", matched: false };
  if (isDemoMode()) {
    revalidatePath("/discover");
    return { success: true, matched: Math.random() > 0.7 };
  }

  const { createServiceRoleClient } = await import(
    "@/lib/supabase/service-role"
  );
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("user_likes").insert({
    from_user_id: user.id,
    to_user_id: toUserId,
  });

  if (error && error.code !== "23505") {
    return { error: "いいねに失敗しました。", matched: false };
  }

  const { data: mutual } = await supabase
    .from("user_likes")
    .select("id")
    .eq("from_user_id", toUserId)
    .eq("to_user_id", user.id)
    .maybeSingle();

  if (mutual) {
    const ids = [user.id, toUserId].sort() as [string, string];
    await supabase.from("matches").upsert(
      { user_a_id: ids[0], user_b_id: ids[1] },
      { onConflict: "user_a_id,user_b_id" }
    );

    revalidatePath("/discover");
    return { success: true, matched: true };
  }

  revalidatePath("/discover");
  return { success: true, matched: false };
}
