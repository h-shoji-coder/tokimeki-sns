import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";
import AppLayout from "@/app/components/layout/AppLayout";

export default async function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Clerk ユーザーを Supabase に自動同期
  await ensureSupabaseUser();

  return <AppLayout>{children}</AppLayout>;
}
