"use client";

import { useTransition, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { createPost } from "@/app/actions/posts";

interface CreatePostFormProps {
  userPhoto?: string | null;
  userName?: string | null;
  onClose: () => void;
}

export default function CreatePostForm({
  userPhoto,
  userName,
  onClose,
}: CreatePostFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createPost(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
        setContent("");
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-800">投稿を作成</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-rose-50 transition-colors"
            aria-label="閉じる"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 overflow-hidden shrink-0">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userName ?? ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-rose-400 font-bold">
                  {userName?.[0] ?? "?"}
                </div>
              )}
            </div>
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今日のときめきをシェアしよう✨ #婚活 などハッシュタグも使えます"
              rows={4}
              className="flex-1 resize-none text-sm text-gray-700 placeholder:text-gray-300 border border-pink-100 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
              maxLength={500}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{content.length} / 500</span>
            <div className="flex gap-2">
              {error && (
                <p className="text-xs text-red-500 self-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={pending || content.trim().length === 0}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full gradient-bg text-white font-semibold text-sm shadow-md shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:opacity-90"
              >
                <Send size={14} />
                {pending ? "投稿中…" : "投稿する"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
