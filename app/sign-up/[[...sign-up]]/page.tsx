import { SignUp } from "@clerk/nextjs";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex flex-col items-center justify-center px-4 py-12">
      {/* ロゴ */}
      <Link href="/" className="flex items-center gap-2 mb-6 group">
        <Heart
          className="text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform"
          size={28}
        />
        <span className="text-2xl font-bold gradient-text">ときめき</span>
      </Link>

      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className="text-rose-400" />
        <p className="text-gray-700 text-sm font-semibold">無料で始める</p>
        <Sparkles size={16} className="text-rose-400" />
      </div>
      <p className="text-gray-400 text-xs mb-6 text-center">
        恋愛診断・マッチング・タイムラインが全部無料
      </p>

      <SignUp />

      <p className="text-xs text-gray-400 mt-6 text-center">
        ※18歳以上の婚活目的の方のみご利用いただけます
      </p>
    </div>
  );
}
