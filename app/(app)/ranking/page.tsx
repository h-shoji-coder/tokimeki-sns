import { Trophy, TrendingUp, TrendingDown, Minus, Heart } from "lucide-react";
import { mockRanking, mockTrendHashtags, weeklyMatchCount } from "@/lib/mock-data";
import { diagnosisResults } from "@/lib/mock-data";
import Avatar from "@/app/components/ui/Avatar";
import { formatCount } from "@/lib/utils";

const medalColors = ["#FBBF24", "#94A3B8", "#CD7C3E"];
const medalEmojis = ["🥇", "🥈", "🥉"];

export default function RankingPage() {
  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center px-4 py-3">
          <Trophy size={20} className="text-amber-400 mr-2" />
          <h1 className="text-lg font-bold text-gray-800">ランキング</h1>
        </div>
      </header>

      {/* 今週のマッチング統計 */}
      <section className="px-4 pt-5 pb-4">
        <div className="rounded-3xl gradient-bg p-5 shadow-lg shadow-rose-200">
          <p className="text-rose-100 text-xs font-medium mb-1">今週のときめき数</p>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl font-black text-white">
              {formatCount(weeklyMatchCount)}
            </span>
            <span className="text-rose-200 text-sm pb-1">件のマッチング成立</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart size={14} className="text-white fill-white" />
            <span className="text-rose-100 text-xs">
              昨週比 +12.4% 🔥 絶賛増加中！
            </span>
          </div>
        </div>
      </section>

      {/* TOP3 */}
      <section className="px-4 pb-4">
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
          <Trophy size={14} className="text-amber-400" />
          今週の人気TOP3
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {mockRanking.slice(0, 3).map((item) => (
            <div
              key={item.rank}
              className="flex flex-col items-center bg-white rounded-2xl p-3 shadow-sm border border-pink-50 card-hover"
            >
              <div className="text-2xl mb-1">{medalEmojis[item.rank - 1]}</div>
              <div className="relative mb-2">
                <Avatar
                  src={item.user.photos[0]}
                  alt={item.user.name}
                  size="md"
                  ring
                />
              </div>
              <p className="text-xs font-bold text-gray-800 text-center">
                {item.user.name}
              </p>
              <p className="text-[10px] text-gray-400">{item.user.age}歳</p>
              <div
                className="mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: medalColors[item.rank - 1] + "20", color: medalColors[item.rank - 1] }}
              >
                ❤️ {item.weeklyLikes}
              </div>
            </div>
          ))}
        </div>

        {/* 4位以下 */}
        <div className="flex flex-col gap-2">
          {mockRanking.slice(3).map((item) => (
            <div
              key={item.rank}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-pink-50"
            >
              <span className="text-lg font-black text-gray-400 w-6 text-center">
                {item.rank}
              </span>
              <Avatar src={item.user.photos[0]} alt={item.user.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  {item.user.name}
                  <span className="text-gray-400 font-normal text-xs ml-1">
                    {item.user.age}歳
                  </span>
                </p>
                <p className="text-xs text-gray-400">{item.user.location}</p>
              </div>
              {item.user.loveType && (
                <span className="text-base">
                  {diagnosisResults[item.user.loveType].emoji}
                </span>
              )}
              <div className="text-xs font-semibold text-rose-500">
                ❤️ {item.weeklyLikes}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* トレンドハッシュタグ */}
      <section className="px-4 pb-8">
        <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
          <TrendingUp size={14} className="text-rose-400" />
          急上昇ハッシュタグ
        </h2>
        <div className="flex flex-col gap-2">
          {mockTrendHashtags.map((item, idx) => (
            <div
              key={item.tag}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-pink-50"
            >
              <span className="text-sm font-black text-gray-300 w-5 text-center">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-rose-500">#{item.tag}</p>
                <p className="text-xs text-gray-400">{formatCount(item.count)} 件の投稿</p>
              </div>
              <div>
                {item.trend === "up" && (
                  <div className="flex items-center gap-0.5 text-green-500">
                    <TrendingUp size={14} />
                    <span className="text-xs font-medium">上昇</span>
                  </div>
                )}
                {item.trend === "down" && (
                  <div className="flex items-center gap-0.5 text-gray-400">
                    <TrendingDown size={14} />
                    <span className="text-xs font-medium">下降</span>
                  </div>
                )}
                {item.trend === "stable" && (
                  <div className="flex items-center gap-0.5 text-gray-400">
                    <Minus size={14} />
                    <span className="text-xs font-medium">安定</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
