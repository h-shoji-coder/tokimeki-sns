"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";
import { isDemoMode } from "@/lib/demo-mode";

const createPostSchema = z.object({
  content: z
    .string()
    .min(1, "本文を入力してください")
    .max(500, "500文字以内で入力してください"),
});

export async function createPost(formData: FormData) {
  const user = await ensureSupabaseUser();
  if (!user) return { error: "ログインが必要です" };

  const raw = { content: formData.get("content") as string };
  const parsed = createPostSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  // デモモード: DBへの書き込みをスキップして成功を返す
  if (isDemoMode()) {
    revalidatePath("/home");
    return { success: true };
  }

  const { createServiceRoleClient } = await import(
    "@/lib/supabase/service-role"
  );
  const { content } = parsed.data;
  const hashtags = Array.from(content.matchAll(/#(\S+)/g)).map((m) => m[1]);

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("posts")
    .insert({ user_id: user.id, content, hashtags });

  if (error) {
    console.error("[createPost] error:", error.message);
    return { error: "投稿に失敗しました。もう一度お試しください。" };
  }

  revalidatePath("/home");
  return { success: true };
}

export async function togglePostLike(postId: string) {
  const user = await ensureSupabaseUser();
  if (!user) return { error: "ログインが必要です" };

  // デモモード
  if (isDemoMode()) {
    revalidatePath("/home");
    return { liked: true };
  }

  const { createServiceRoleClient } = await import(
    "@/lib/supabase/service-role"
  );
  const supabase = createServiceRoleClient();

  const { data: existing } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("post_likes").delete().eq("id", existing.id);
    revalidatePath("/home");
    return { liked: false };
  } else {
    await supabase
      .from("post_likes")
      .insert({ post_id: postId, user_id: user.id });
    revalidatePath("/home");
    return { liked: true };
  }
}
