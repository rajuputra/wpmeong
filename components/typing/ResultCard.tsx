'use client';

import { TestResult } from '@/types/typing';

interface ResultCardProps {
  result: TestResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-8">
        <div className="flex flex-col items-center p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
          <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">WPM</span>
          <span className="text-5xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">{result.wpm}</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
          <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Accuracy</span>
          <span className="text-4xl font-bold text-blue-400">{result.accuracy}%</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
          <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Consistency</span>
          <span className="text-4xl font-bold text-pink-400">{result.consistency}%</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
          <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Raw WPM</span>
          <span className="text-4xl font-bold text-gray-300">{result.rawWpm}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full text-center">
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="block text-gray-500 text-xs uppercase mb-1">Characters</span>
          <span className="text-green-400 font-semibold">{result.correctChars}</span>
          <span className="text-gray-500 mx-1">/</span>
          <span className="text-red-400 font-semibold">{result.incorrectChars}</span>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="block text-gray-500 text-xs uppercase mb-1">Time</span>
          <span className="text-white font-semibold">{result.snapshots.length}s</span>
        </div>
        
        <div className="bg-black/20 p-3 rounded-lg">
          <span className="block text-gray-500 text-xs uppercase mb-1">Modifications</span>
          <span className="text-blue-400 font-semibold">{result.modifications}</span>
        </div>
      </div>
    </div>
  );
}
