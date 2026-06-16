"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { DiagnosisQuestion, LoveType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface QuizClientProps {
  questions: DiagnosisQuestion[];
}

export default function QuizClient({ questions }: QuizClientProps) {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<LoveType, number>>({
    romantic: 0,
    logical: 0,
    free: 0,
    caring: 0,
    passionate: 0,
    calm: 0,
    playful: 0,
    serious: 0,
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  const handleSelect = (optionId: string) => {
    if (animating) return;
    setSelected(optionId);

    const option = question.options.find((o) => o.id === optionId);
    if (option) {
      const newScores = { ...scores };
      Object.entries(option.scores).forEach(([type, score]) => {
        newScores[type as LoveType] += score;
      });

      setAnimating(true);
      setTimeout(() => {
        setScores(newScores);
        setSelected(null);
        setAnimating(false);

        if (currentQ + 1 >= questions.length) {
          const resultType = Object.entries(newScores).sort(
            ([, a], [, b]) => b - a
          )[0][0] as LoveType;
          router.push(`/diagnosis/result?type=${resultType}`);
        } else {
          setCurrentQ((q) => q + 1);
        }
      }, 400);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => currentQ > 0 ? setCurrentQ(q => q - 1) : router.back()}
            className="p-2 rounded-full hover:bg-rose-50 transition-colors"
            aria-label="戻る"
          >
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Q{currentQ + 1}</span>
              <span>{currentQ + 1} / {questions.length}</span>
            </div>
            <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full gradient-bg rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* 質問 */}
      <div
        key={currentQ}
        className={cn(
          "flex-1 px-5 pt-8 pb-6 animate-fade-in",
          animating && "opacity-50 transition-opacity"
        )}
      >
        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-4 shadow-md shadow-rose-200">
            <span className="text-white font-bold text-lg">Q{currentQ + 1}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 leading-snug">
            {question.text}
          </h2>
        </div>

        {/* 選択肢 */}
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 font-medium text-sm",
                selected === option.id
                  ? "border-rose-500 bg-rose-50 text-rose-700 scale-[0.98]"
                  : "border-pink-100 bg-white text-gray-700 hover:border-rose-300 hover:bg-rose-50"
              )}
            >
              <span className="font-bold text-rose-400 mr-2">
                {option.id.toUpperCase()}
              </span>
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
