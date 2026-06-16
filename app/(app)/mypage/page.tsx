import {
  Settings,
  Edit3,
  Heart,
  Users,
  Star,
  ChevronRight,
  Crown,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ensureSupabaseUser } from "@/lib/supabase/auth-helpers";
import { diagnosisResults } from "@/lib/mock-data";
import Avatar from "@/app/components/ui/Avatar";
import Badge from "@/app/components/ui/Badge";

export default async function MyPage() {
  const me = await ensureSupabaseUser();

  const avatarUrl =
    me?.avatar_url ??
    `https://api.dicebear.com/9.x/personas/svg?seed=${me?.clerk_user_id ?? "default"}&backgroundColor=fce7f3`;
  const displayName = me?.full_name ?? "名前未設定";
  const loveType = me?.love_type ?? null;
  const myResult = loveType ? diagnosisResults[loveType] : null;

  const stats = [
    {
      label: "いいね受け取り",
      value: me?.liked_count ?? 0,
      icon: Heart,
      color: "text-rose-500",
    },
    {
      label: "マッチング",
      value: me?.matched_count ?? 0,
      icon: Users,
      color: "text-blue-500",
    },
    { label: "投稿", value: 0, icon: Star, color: "text-amber-500" },
  ];

  const menuItems = [
    { label: "プロフィール編集", href: "#", icon: Edit3 },
    {
      label: "プレミアムプランに変更",
      href: "#",
      icon: Crown,
      badge: "おすすめ",
    },
    { label: "マッチング一覧", href: "#", icon: Users },
    { label: "いいねした人", href: "#", icon: Heart },
    { label: "設定", href: "#", icon: Settings },
  ];

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">マイページ</h1>
          {/* Clerk UserButton */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </header>

      {/* プロフィールカード */}
      <section className="px-4 pt-5 pb-4">
        <div className="bg-white rounded-3xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="h-20 gradient-bg" />
          <div className="px-4 pb-4 -mt-8">
            <div className="flex items-end justify-between mb-3">
              <div className="p-1 bg-white rounded-full shadow-sm">
                <Avatar src={avatarUrl} alt={displayName} size="xl" ring />
              </div>
              <Link
                href="#"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-rose-200 text-rose-500 text-sm font-semibold hover:bg-rose-50 transition-colors mt-2"
              >
                <Edit3 size={14} />
                編集
              </Link>
            </div>

            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-xl font-bold text-gray-800">
                  {displayName}
                  {me?.age && (
                    <span className="text-base font-normal text-gray-400 ml-1">
                      {me.age}歳
                    </span>
                  )}
                </h2>
                {myResult && (
                  <Badge variant="primary">
                    {myResult.emoji} {myResult.title}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {me?.location && `${me.location} / `}
                {me?.job ?? "職業未設定"}
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {me?.bio ?? "自己紹介を設定しましょう ✨"}
            </p>

            {Array.isArray(me?.hobbies) && me.hobbies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(me.hobbies as string[]).map((hobby) => (
                  <span
                    key={hobby}
                    className="text-xs bg-pink-50 text-rose-500 px-3 py-1 rounded-full font-medium"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 統計 */}
      <section className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-3.5 shadow-sm border border-pink-50 text-center"
            >
              <Icon size={20} className={`${color} mx-auto mb-1.5`} />
              <p className="text-xl font-black text-gray-800">{value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 診断結果バナー */}
      {myResult ? (
        <section className="px-4 pb-4">
          <Link href="/diagnosis/quiz">
            <div
              className="rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-pink-50"
              style={{ backgroundColor: myResult.bgColor }}
            >
              <span className="text-3xl">{myResult.emoji}</span>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">あなたの恋愛タイプ</p>
                <p
                  className="text-base font-bold"
                  style={{ color: myResult.color }}
                >
                  {myResult.title}
                </p>
              </div>
              <ChevronRight size={16} style={{ color: myResult.color }} />
            </div>
          </Link>
        </section>
      ) : (
        <section className="px-4 pb-4">
          <Link href="/diagnosis/quiz">
            <div className="rounded-2xl p-4 flex items-center gap-3 bg-gradient-to-r from-rose-500 to-rose-400 shadow-md shadow-rose-200">
              <span className="text-3xl">🔮</span>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">
                  恋愛タイプを診断しよう！
                </p>
                <p className="text-rose-100 text-xs mt-0.5">
                  あなたのタイプがまだわかりません
                </p>
              </div>
              <ChevronRight size={16} className="text-white" />
            </div>
          </Link>
        </section>
      )}

      {/* メニュー */}
      <section className="px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden divide-y divide-pink-50">
          {menuItems.map(({ label, href, icon: Icon, badge }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-4 hover:bg-rose-50 transition-colors"
            >
              <Icon size={18} className="text-gray-400 shrink-0" />
              <span className="flex-1 text-sm font-medium text-gray-700">
                {label}
              </span>
              {badge && (
                <span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
          ))}
          {/* ログアウト */}
          <div className="flex items-center gap-3 px-4 py-4">
            <LogOut size={18} className="text-gray-400 shrink-0" />
            <span className="flex-1 text-sm font-medium text-gray-500">
              ログアウト
            </span>
            <UserButton
              appearance={{
                elements: { avatarBox: "w-6 h-6", userButtonBox: "gap-0" },
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
