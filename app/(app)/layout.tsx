import { isDemoMode } from "@/lib/demo-mode";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";
import AppLayout from "@/app/components/layout/AppLayout";

export default async function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demo = isDemoMode();

  if (!demo) {
    // 本番モード: Clerk 認証チェック + Supabase 同期
    const { auth } = await import("@clerk/nextjs/server");
    const { redirect } = await import("next/navigation");
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
    await ensureSupabaseUser();
  }

  return <AppLayout>{children}</AppLayout>;
}
