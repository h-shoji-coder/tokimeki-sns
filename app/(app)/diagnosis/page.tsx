import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { diagnosisResults } from "@/lib/mock-data";

export default function DiagnosisTopPage() {
  const types = Object.values(diagnosisResults);

  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-pink-100">
        <div className="flex items-center px-4 py-3">
          <h1 className="text-lg font-bold text-gray-800">恋愛タイプ診断</h1>
        </div>
      </header>

      {/* ヒーロー */}
      <section className="px-5 pt-6 pb-4 text-center">
        <div className="text-5xl mb-3 animate-float">🔮</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          あなたの恋愛タイプは？
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          10問の質問に答えるだけ。
          <br />
          あなたにぴったりの恋愛スタイルが分かります！
          <br />
          <span className="text-rose-400 font-medium">SNSでシェアして話題に🔥</span>
        </p>
        <Link
          href="/diagnosis/quiz"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-white font-bold text-base shadow-lg shadow-rose-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles size={20} />
          診断スタート
        </Link>
        <p className="text-xs text-gray-400 mt-3">所要時間：約3分</p>
      </section>

      {/* タイプ一覧プレビュー */}
      <section className="px-4 pb-6">
        <h3 className="text-sm font-bold text-gray-700 mb-3">
          8つの恋愛タイプ
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {types.map((result) => (
            <Link
              key={result.type}
              href="/diagnosis/quiz"
              className="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-sm border border-pink-50 card-hover"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                style={{ backgroundColor: result.bgColor }}
              >
                {result.emoji}
              </div>
              <div className="min-w-0">
                <p
                  className="text-xs font-bold truncate"
                  style={{ color: result.color }}
                >
                  {result.title}
                </p>
                <p className="text-[10px] text-gray-400 leading-tight mt-0.5 line-clamp-2">
                  {result.description.slice(0, 30)}…
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/diagnosis/quiz"
            className="inline-flex items-center gap-1 text-sm text-rose-500 font-medium hover:text-rose-600 transition-colors"
          >
            自分のタイプを調べる
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
