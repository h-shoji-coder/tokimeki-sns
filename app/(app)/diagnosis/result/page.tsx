import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-rose-400 text-2xl animate-pulse">診断中…💕</div></div>}>
      <ResultClient />
    </Suspense>
  );
}
