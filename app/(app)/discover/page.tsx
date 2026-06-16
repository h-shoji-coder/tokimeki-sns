import { SlidersHorizontal } from "lucide-react";
import { mockUsers } from "@/lib/mock-data";
import SwipeClient from "./SwipeClient";

const myHobbies = ["カフェ巡り", "旅行", "映画", "音楽フェス"];

export default function DiscoverPage() {
  const candidates = mockUsers.filter((u) => u.gender !== "male");

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">見つける</h1>
          <button
            className="p-2 rounded-full hover:bg-rose-50 transition-colors"
            aria-label="フィルター"
          >
            <SlidersHorizontal size={20} className="text-gray-500" />
          </button>
        </div>
      </header>

      {/* いいね残数バー */}
      <div className="bg-amber-50 border-b border-amber-100 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-amber-700 font-medium">
            今日の残りいいね：<strong>7回</strong>
          </span>
          <button className="text-xs text-rose-500 font-semibold bg-rose-50 px-3 py-1 rounded-full hover:bg-rose-100 transition-colors">
            ✨ プレミアム（無制限）
          </button>
        </div>
      </div>

      <div className="pt-5 pb-4">
        <SwipeClient users={candidates} myHobbies={myHobbies} />
      </div>
    </div>
  );
}
