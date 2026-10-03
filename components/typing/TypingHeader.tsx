'use client';

import { useTypingStore } from '@/store/useTypingStore';
import { DurationPicker } from './DurationPicker';
import { LanguagePicker } from './LanguagePicker';
import { DifficultyPicker } from './DifficultyPicker';

export function TypingHeader() {
  const { resetTest } = useTypingStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl mx-auto mb-8 bg-zinc-900/50 p-4 rounded-xl backdrop-blur-sm border border-white/5 shadow-2xl">
      <div className="flex space-x-4 mb-4 sm:mb-0">
        <DurationPicker />
        <LanguagePicker />
      </div>
      
      <div className="flex space-x-4">
        <DifficultyPicker />
        <button 
          onClick={resetTest}
          className="px-4 py-1.5 rounded-md text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          Reset ↻
        </button>
      </div>
    </div>
  );
}
