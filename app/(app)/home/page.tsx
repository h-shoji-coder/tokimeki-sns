import { Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";
import { mockPosts, mockUsers } from "@/lib/mock-data";
import Avatar from "@/app/components/ui/Avatar";
import PostCard from "./PostCard";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const supabaseUser = await ensureSupabaseUser();
  const supabase = await createClient();

  // Supabase から投稿を取得（fallback: モックデータ）
  let posts = mockPosts;
  let users = mockUsers;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("supabase.co")) {
    const { data: dbPosts } = await supabase
      .from("posts")
      .select(
        `
        id, content, image_urls, hashtags, like_count, comment_count, created_at,
        users!inner (id, full_name, avatar_url, clerk_user_id)
      `
      )
      .order("created_at", { ascending: false })
      .limit(20);

    if (dbPosts && dbPosts.length > 0) {
      posts = dbPosts.map((p) => {
        const user = Array.isArray(p.users) ? p.users[0] : p.users;
        return {
          id: p.id,
          userId: (user as { id: string }).id,
          userName: (user as { full_name: string | null }).full_name ?? "名無し",
          userPhoto:
            (user as { avatar_url: string | null }).avatar_url ??
            `https://api.dicebear.com/9.x/personas/svg?seed=${(user as { clerk_user_id: string }).clerk_user_id}`,
          content: p.content,
          hashtags: p.hashtags,
          likeCount: p.like_count,
          commentCount: p.comment_count,
          liked: false,
          createdAt: p.created_at,
        };
      });
    }

    const { data: dbUsers } = await supabase
      .from("users")
      .select("id, full_name, avatar_url, clerk_user_id, hobbies, love_type, age, location, job, bio, liked_count, matched_count, gender, created_at")
      .limit(10);

    if (dbUsers && dbUsers.length > 0) {
      users = dbUsers.map((u) => ({
        id: u.id,
        name: u.full_name ?? "名無し",
        age: u.age ?? 25,
        gender: u.gender ?? "other",
        photos: [
          u.avatar_url ??
            `https://api.dicebear.com/9.x/personas/svg?seed=${u.clerk_user_id}`,
        ],
        bio: u.bio ?? "",
        hobbies: u.hobbies,
        loveType: u.love_type ?? undefined,
        location: u.location ?? "",
        job: u.job ?? "",
        likedCount: u.liked_count,
        matchedCount: u.matched_count,
        createdAt: u.created_at,
      }));
    }
  }

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">💕</span>
            <span className="text-lg font-bold gradient-text">ときめき</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 rounded-full hover:bg-rose-50 transition-colors"
              aria-label="通知"
            >
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-rose-50 transition-colors"
              aria-label="メッセージ"
            >
              <MessageCircle size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* ストーリー */}
      <section className="bg-white border-b border-pink-50">
        <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto">
          {users.map((user) => (
            <div key={user.id} className="shrink-0 flex flex-col items-center gap-1">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400">
                <Avatar
                  src={user.photos[0]}
                  alt={user.name}
                  size="md"
                  className="ring-2 ring-white"
                />
              </div>
              <span className="text-[10px] text-gray-500 max-w-[48px] truncate">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 診断バナー */}
      <section className="px-4 pt-4 pb-2">
        <Link
          href="/diagnosis"
          className="flex items-center gap-3 bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl p-4 shadow-md shadow-rose-200 transition-all hover:scale-[1.01]"
        >
          <span className="text-3xl">🔮</span>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">恋愛タイプ診断</p>
            <p className="text-rose-100 text-xs mt-0.5">
              あなたの恋愛スタイルを診断してシェアしよう！
            </p>
          </div>
          <span className="text-white text-lg">→</span>
        </Link>
      </section>

      {/* フィード */}
      <section className="px-4 pb-4 flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-700">タイムライン</h2>
          <span className="text-xs text-gray-400">最新順</span>
        </div>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🌸</p>
            <p className="text-gray-500 text-sm">まだ投稿がありません</p>
            <p className="text-gray-400 text-xs mt-1">
              最初の投稿をしてみよう！
            </p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>

      {/* 投稿ボタン (Client Component) */}
      <HomeClient
        userPhoto={supabaseUser?.avatar_url}
        userName={supabaseUser?.full_name}
      />
    </div>
  );
}
