import Link from "next/link";
import { Heart, Sparkles, Trophy, ArrowRight, Star, Users } from "lucide-react";
import { mockUsers } from "@/lib/mock-data";
import Avatar from "./components/ui/Avatar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 overflow-hidden">
      {/* ヘッダー */}
      <header className="max-w-md mx-auto flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500 fill-rose-500" size={24} />
          <span className="text-xl font-bold gradient-text">ときめき</span>
        </div>
        <Link
          href="/home"
          className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
        >
          ログイン
        </Link>
      </header>

      {/* ヒーローセクション */}
      <section className="max-w-md mx-auto px-5 pt-10 pb-8 text-center">
        <div className="relative inline-block mb-6">
          <div className="text-6xl animate-float">💕</div>
          <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
          出会いをもっと、
          <br />
          <span className="gradient-text">ときめきに。</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          恋愛診断でバズりながら本命に出会える
          <br />
          新世代の婚活SNS
        </p>

        {/* CTA ボタン */}
        <div className="flex flex-col gap-3">
          <Link
            href="/diagnosis"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl gradient-bg text-white font-bold text-base shadow-lg shadow-rose-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles size={20} />
            まず恋愛タイプを診断する
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/home"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white border-2 border-rose-200 text-rose-500 font-semibold text-sm transition-all duration-200 hover:bg-rose-50"
          >
            タイムラインを見る
          </Link>
        </div>
      </section>

      {/* 統計バナー */}
      <section className="max-w-md mx-auto px-5 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100">
          <div className="grid grid-cols-3 divide-x divide-pink-100">
            <div className="text-center px-2">
              <p className="text-xl font-bold gradient-text">1.4万+</p>
              <p className="text-xs text-gray-500 mt-0.5">今週のマッチング</p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl font-bold gradient-text">98万+</p>
              <p className="text-xs text-gray-500 mt-0.5">診断シェア数</p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl font-bold gradient-text">4.8</p>
              <p className="text-xs text-gray-500 mt-0.5">
                <Star size={10} className="inline fill-amber-400 text-amber-400" />
                {" "}満足度
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴 */}
      <section className="max-w-md mx-auto px-5 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
          ときめきが選ばれる3つの理由
        </h2>
        <div className="flex flex-col gap-3">
          {[
            {
              icon: "🔮",
              title: "シェアしたくなる恋愛診断",
              desc: "8タイプの恋愛診断でSNSがバズる！診断結果をシェアして出会いを広げよう",
            },
            {
              icon: "💫",
              title: "スワイプで直感マッチング",
              desc: "共通点の数が一目でわかる。趣味・価値観が合う人と自然に出会える",
            },
            {
              icon: "📱",
              title: "婚活SNSタイムライン",
              desc: "日常をシェアしながら婚活。いいね・コメントで自然な会話が生まれる",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-pink-50"
            >
              <div className="text-3xl shrink-0">{item.icon}</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 人気ユーザーセクション */}
      <section className="max-w-md mx-auto px-5 mb-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-rose-400" />
            <h2 className="text-sm font-bold text-gray-700">今週の人気ユーザー</h2>
          </div>
          <span className="text-xs text-rose-400 font-medium">プレビュー</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          {mockUsers.slice(0, 4).map((user) => (
            <div
              key={user.id}
              className="shrink-0 flex flex-col items-center gap-2 bg-white rounded-2xl p-3 shadow-sm border border-pink-50 w-24"
            >
              <div className="relative">
                <Avatar src={user.photos[0]} alt={user.name} size="lg" ring />
                <span className="absolute -bottom-1 -right-1 text-base">
                  {user.loveType === "romantic"
                    ? "💕"
                    : user.loveType === "free"
                    ? "🌈"
                    : user.loveType === "serious"
                    ? "💎"
                    : "✨"}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-700 text-center">
                {user.name}
                <span className="text-gray-400"> {user.age}</span>
              </p>
              <p className="text-[10px] text-rose-500 font-medium">
                ❤️ {user.likedCount}
              </p>
            </div>
          ))}
          <div className="shrink-0 flex flex-col items-center justify-center gap-1 bg-rose-50 rounded-2xl border-2 border-dashed border-rose-200 w-24 h-[120px]">
            <span className="text-xs text-rose-400 font-medium text-center">
              登録して
              <br />
              全員を
              <br />
              見る
            </span>
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="max-w-md mx-auto px-5 pb-12 text-center">
        <p className="text-xs text-gray-400 mb-4">
          利用は完全無料・今すぐ始められます
        </p>
        <Link
          href="/home"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-white font-bold text-base shadow-lg shadow-rose-200 transition-all duration-200 hover:scale-[1.02]"
        >
          <Heart size={18} className="fill-white" />
          無料ではじめる
        </Link>
        <p className="text-xs text-gray-400 mt-3">
          ※18歳以上の婚活目的の方のみご利用いただけます
        </p>
      </section>
    </div>
  );
}
