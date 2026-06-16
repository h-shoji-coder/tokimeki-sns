"use client";

import { useState } from "react";
import { X, Heart, Star, RotateCcw } from "lucide-react";
import type { User } from "@/lib/types";
import Avatar from "@/app/components/ui/Avatar";
import Badge from "@/app/components/ui/Badge";
import { cn } from "@/lib/utils";

interface SwipeClientProps {
  users: User[];
  myHobbies: string[];
}

export default function SwipeClient({ users, myHobbies }: SwipeClientProps) {
  const [cards, setCards] = useState(users);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [matched, setMatched] = useState<User | null>(null);
  const [passedIds, setPassedIds] = useState<Set<string>>(new Set());

  const current = cards[currentIdx];

  const commonHobbies = current
    ? myHobbies.filter((h) => current.hobbies.includes(h))
    : [];

  const handleSwipe = (dir: "left" | "right") => {
    if (!current) return;
    setSwipeDir(dir);

    setTimeout(() => {
      if (dir === "right" && Math.random() > 0.4) {
        setMatched(current);
      } else {
        setPassedIds((prev) => new Set([...prev, current.id]));
        nextCard();
      }
      setSwipeDir(null);
    }, 350);
  };

  const nextCard = () => {
    setCurrentIdx((prev) => prev + 1);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setPassedIds(new Set());
    setMatched(null);
  };

  if (matched) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-fade-in">
        <div className="text-7xl mb-4 animate-float">🎉</div>
        <h2 className="text-2xl font-bold gradient-text mb-2">マッチング成立！</h2>
        <p className="text-gray-500 text-sm mb-6">
          {matched.name}さんとマッチングしました！✨
        </p>
        <div className="relative mb-6">
          <Avatar src={matched.photos[0]} alt={matched.name} size="xl" ring />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-lg">
            <Heart size={18} className="text-white fill-white" />
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2 font-medium">{matched.name} • {matched.age}歳</p>
        <p className="text-xs text-gray-400 mb-6">{matched.location} / {matched.job}</p>
        <div className="flex gap-3">
          <button
            onClick={() => { setMatched(null); nextCard(); }}
            className="px-5 py-2.5 rounded-full bg-pink-100 text-rose-500 font-semibold text-sm transition-all hover:bg-pink-200"
          >
            続けて探す
          </button>
          <button
            className="px-5 py-2.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-md shadow-rose-200 transition-all hover:opacity-90"
          >
            メッセージを送る
          </button>
        </div>
      </div>
    );
  }

  if (!current || currentIdx >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="text-6xl mb-4">🌟</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          今日の候補を全員見ました！
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          明日また新しい候補が届きます。
          <br />
          もう一度同じ人を見ることもできます。
        </p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 rounded-full gradient-bg text-white font-semibold shadow-md shadow-rose-200"
        >
          <RotateCcw size={16} />
          もう一度見る
        </button>
      </div>
    );
  }

  return (
    <div className="px-4">
      {/* 残り数 */}
      <div className="text-center mb-4">
        <span className="text-xs text-gray-400">
          {currentIdx + 1} / {cards.length}
        </span>
      </div>

      {/* カード */}
      <div className="relative mb-6">
        {/* 次のカードの影 */}
        {cards[currentIdx + 1] && (
          <div className="absolute inset-0 bg-white rounded-3xl transform scale-[0.95] translate-y-2 shadow-sm border border-pink-50" />
        )}

        <div
          className={cn(
            "relative bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden transition-all",
            swipeDir === "right" && "swipe-right",
            swipeDir === "left" && "swipe-left",
            !swipeDir && "hover:shadow-xl"
          )}
        >
          {/* 写真 */}
          <div className="h-72 bg-gradient-to-br from-pink-100 to-rose-50 flex items-center justify-center">
            <Avatar
              src={current.photos[0]}
              alt={current.name}
              className="!w-40 !h-40 !rounded-full"
              size="xl"
            />
          </div>

          {/* スワイプインジケーター */}
          {swipeDir === "right" && (
            <div className="absolute top-6 left-6 rotate-[-15deg] border-4 border-rose-500 rounded-xl px-3 py-1">
              <span className="text-rose-500 font-black text-xl">LIKE 💕</span>
            </div>
          )}
          {swipeDir === "left" && (
            <div className="absolute top-6 right-6 rotate-[15deg] border-4 border-gray-400 rounded-xl px-3 py-1">
              <span className="text-gray-500 font-black text-xl">PASS</span>
            </div>
          )}

          {/* プロフィール情報 */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {current.name}
                  <span className="text-base font-normal text-gray-400 ml-1">
                    {current.age}
                  </span>
                </h3>
                <p className="text-xs text-gray-500">
                  {current.location} / {current.job}
                </p>
              </div>
              {current.loveType && (
                <Badge variant="primary">
                  {current.loveType === "romantic" && "💕 ロマンチスト"}
                  {current.loveType === "serious" && "💎 真剣派"}
                  {current.loveType === "free" && "🌈 自由人"}
                  {current.loveType === "calm" && "🍃 穏やか派"}
                  {current.loveType === "passionate" && "🔥 情熱家"}
                  {current.loveType === "playful" && "🎉 遊び好き"}
                </Badge>
              )}
            </div>

            {/* 共通点 */}
            {commonHobbies.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Star
                  size={14}
                  className="text-amber-400 fill-amber-400 shrink-0"
                />
                <span className="text-xs text-amber-600 font-semibold">
                  共通点 {commonHobbies.length}個：
                  {commonHobbies.slice(0, 3).join("・")}
                </span>
              </div>
            )}

            {/* 趣味チップ */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {current.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full font-medium",
                    myHobbies.includes(hobby)
                      ? "bg-rose-100 text-rose-600"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {hobby}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {current.bio}
            </p>
          </div>
        </div>
      </div>

      {/* スワイプボタン */}
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-md transition-all hover:scale-110 hover:border-gray-300 active:scale-95"
          aria-label="パス"
        >
          <X size={26} className="text-gray-400" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-xl shadow-rose-300 transition-all hover:scale-110 active:scale-95"
          aria-label="いいね"
        >
          <Heart size={30} className="text-white fill-white" />
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        左：パス　右：いいね
      </p>
    </div>
  );
}
