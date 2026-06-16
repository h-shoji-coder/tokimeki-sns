"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import CreatePostForm from "./CreatePostForm";

interface HomeClientProps {
  userPhoto?: string | null;
  userName?: string | null;
}

export default function HomeClient({ userPhoto, userName }: HomeClientProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && (
        <CreatePostForm
          userPhoto={userPhoto}
          userName={userName}
          onClose={() => setShowForm(false)}
        />
      )}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full gradient-bg shadow-lg shadow-rose-300 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="投稿する"
      >
        <PlusCircle size={26} className="text-white" />
      </button>
    </>
  );
}
