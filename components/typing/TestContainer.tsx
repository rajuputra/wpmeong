'use client';

import { useEffect } from 'react';
import { useTypingStore } from '@/store/useTypingStore';
import { TypingArea } from './TypingArea';
import { Timer } from './Timer';
import { TypingHeader } from './TypingHeader';
import { ResultScreen } from './ResultScreen';

export function TestContainer() {
  const { result, startTest } = useTypingStore();

  useEffect(() => {
    startTest();
  }, [startTest]);

  if (result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <ResultScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <TypingHeader />
      
      <div className="mb-6 flex justify-center">
        <Timer />
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none z-10 hidden sm:block w-[110%] -left-[5%]"></div>
        <TypingArea />
      </div>
    </div>
  );
}
