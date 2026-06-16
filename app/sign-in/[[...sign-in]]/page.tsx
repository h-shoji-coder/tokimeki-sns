import { SignIn } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50 flex flex-col items-center justify-center px-4 py-12">
      {/* ロゴ */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <Heart
          className="text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform"
          size={28}
        />
        <span className="text-2xl font-bold gradient-text">ときめき</span>
      </Link>

      <p className="text-gray-500 text-sm mb-6 text-center">
        ログインして、ときめきを探しに行こう 💕
      </p>

      <SignIn />

      <p className="text-xs text-gray-400 mt-6 text-center">
        ※18歳以上の婚活目的の方のみご利用いただけます
      </p>
    </div>
  );
}
