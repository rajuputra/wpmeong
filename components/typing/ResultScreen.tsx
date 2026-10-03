'use client';

import { useTypingStore } from '@/store/useTypingStore';
import { ResultCard } from './ResultCard';
import { ResultChart } from './ResultChart';

export function ResultScreen() {
  const { result, resetTest } = useTypingStore();

  if (!result) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 bg-zinc-900/50 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in duration-300">
      <h2 className="text-3xl font-bold text-white mb-8">Test Complete</h2>
      
      <ResultCard result={result} />
      <ResultChart snapshots={result.snapshots} />

      <button
        onClick={resetTest}
        className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0"
      >
        Try Again (Tab + Enter)
      </button>
    </div>
  );
}
