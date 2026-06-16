"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Share2,
  Heart,
  ChevronRight,
  RotateCcw,
  Check,
  Save,
} from "lucide-react";
import { diagnosisResults } from "@/lib/mock-data";
import type { LoveType } from "@/lib/types";
import { useState, useTransition } from "react";
import { saveDiagnosisResult } from "@/app/actions/users";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as LoveType | null;
  const type: LoveType = typeParam && diagnosisResults[typeParam] ? typeParam : "romantic";
  const result = diagnosisResults[type];
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savePending, startSaveTransition] = useTransition();

  const handleShare = () => {
    const text = `私の恋愛タイプは「${result.title} ${result.emoji}」でした！\nあなたも診断してみて👇\n#ときめき診断 #恋愛タイプ`;
    if (navigator.share) {
      navigator.share({ title: "ときめき診断結果", text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const compatibleResults = result.compatibleTypes.map((t) => diagnosisResults[t]);

  return (
    <div className="min-h-screen pb-8">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">診断結果</h1>
        </div>
      </header>

      {/* 結果カード */}
      <div className="px-4 pt-6">
        <div
          className="rounded-3xl overflow-hidden shadow-xl shadow-rose-100 border border-pink-100 animate-slide-up"
          style={{ backgroundColor: result.bgColor }}
        >
          {/* タイトルエリア */}
          <div className="p-6 text-center">
            <div className="text-7xl mb-3 animate-float">{result.emoji}</div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: result.color }}
            >
              あなたの恋愛タイプは
            </p>
            <h2 className="text-3xl font-black mb-3" style={{ color: result.color }}>
              {result.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* 詳細 */}
          <div className="bg-white mx-4 mb-4 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
              <span style={{ color: result.color }}>✦</span> あなたの強み
            </h3>
            <div className="flex flex-col gap-2">
              {result.strengths.map((s) => (
                <div key={s} className="flex items-start gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: result.bgColor }}
                  >
                    <Check size={12} style={{ color: result.color }} />
                  </div>
                  <span className="text-sm text-gray-600">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white mx-4 mb-6 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
              <span>💡</span> アドバイス
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{result.advice}</p>
          </div>
        </div>
      </div>

      {/* 相性のいいタイプ */}
      <div className="px-4 mt-5">
        <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-1.5">
          <Heart size={14} className="text-rose-400 fill-rose-400" />
          相性のいいタイプ
        </h3>
        <div className="flex gap-3">
          {compatibleResults.map((r) => (
            <div
              key={r.type}
              className="flex-1 bg-white rounded-2xl p-4 border border-pink-100 shadow-sm text-center"
            >
              <div className="text-3xl mb-1">{r.emoji}</div>
              <p
                className="text-xs font-bold"
                style={{ color: r.color }}
              >
                {r.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* アクション */}
      <div className="px-4 mt-6 flex flex-col gap-3">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl gradient-bg text-white font-bold text-base shadow-lg shadow-rose-200 transition-all hover:opacity-90"
        >
          {copied ? (
            <>
              <Check size={20} />
              コピーしました！
            </>
          ) : (
            <>
              <Share2 size={20} />
              診断結果をシェアする
            </>
          )}
        </button>
        <Link
          href="/discover"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white border-2 border-rose-200 text-rose-500 font-semibold text-sm transition-all hover:bg-rose-50"
        >
          相性のいい人を探す
          <ChevronRight size={16} />
        </Link>
        <button
          onClick={() => {
            startSaveTransition(async () => {
              await saveDiagnosisResult(type);
              setSaved(true);
            });
          }}
          disabled={savePending || saved}
          className="flex items-center justify-center gap-1.5 text-sm text-gray-500 font-medium hover:text-gray-700 transition-colors py-2 disabled:opacity-50"
        >
          {saved ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-600">プロフィールに保存済み</span>
            </>
          ) : (
            <>
              <Save size={14} />
              {savePending ? "保存中…" : "プロフィールに保存する"}
            </>
          )}
        </button>
        <Link
          href="/diagnosis/quiz"
          className="flex items-center justify-center gap-1.5 text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors py-2"
        >
          <RotateCcw size={14} />
          もう一度診断する
        </Link>
      </div>
    </div>
  );
}
