"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Sparkles, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "ホーム" },
  { href: "/discover", icon: Compass, label: "見つける" },
  { href: "/diagnosis", icon: Sparkles, label: "診断" },
  { href: "/ranking", icon: Trophy, label: "ランキング" },
  { href: "/mypage", icon: User, label: "マイページ" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-pink-100 safe-area-pb">
      <div className="max-w-md mx-auto flex items-center justify-around px-2 py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",
                isActive
                  ? "text-rose-500"
                  : "text-gray-400 hover:text-rose-400"
              )}
              aria-label={label}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-all duration-200",
                    isActive && "drop-shadow-sm"
                  )}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-200",
                  isActive ? "text-rose-500" : "text-gray-400"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
