"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "@/lib/types";
import Avatar from "@/app/components/ui/Avatar";
import { formatRelativeTime, formatCount } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [heartPop, setHeartPop] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      setHeartPop(true);
      setTimeout(() => setHeartPop(false), 300);
    } else {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-pink-50 overflow-hidden animate-slide-up">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <Avatar src={post.userPhoto} alt={post.userName} size="md" ring />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm">{post.userName}</p>
          <p className="text-xs text-gray-400">
            {formatRelativeTime(post.createdAt)}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="シェア">
          <Share2 size={16} />
        </button>
      </div>

      {/* コンテンツ */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content.replace(/#\S+/g, "").trim()}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-rose-400 font-medium hover:text-rose-500 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* アクションバー */}
      <div className="flex items-center gap-5 px-4 py-3 border-t border-pink-50">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 group transition-all"
          aria-label={liked ? "いいね取り消し" : "いいね"}
        >
          <Heart
            size={20}
            className={`transition-all duration-200 ${
              heartPop ? "animate-heart-pop" : ""
            } ${
              liked
                ? "fill-rose-500 text-rose-500"
                : "text-gray-400 group-hover:text-rose-400"
            }`}
          />
          <span
            className={`text-sm font-medium transition-colors ${
              liked ? "text-rose-500" : "text-gray-400"
            }`}
          >
            {formatCount(likeCount)}
          </span>
        </button>
        <button className="flex items-center gap-1.5 group transition-all" aria-label="コメント">
          <MessageCircle
            size={20}
            className="text-gray-400 group-hover:text-rose-400 transition-colors"
          />
          <span className="text-sm font-medium text-gray-400">
            {formatCount(post.commentCount)}
          </span>
        </button>
      </div>
    </article>
  );
}
