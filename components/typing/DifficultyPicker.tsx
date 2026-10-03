'use client';
import { useTypingStore } from '@/store/useTypingStore';

export function DifficultyPicker() {
  const { config, setConfig } = useTypingStore();

  return (
    <div className="flex rounded-md bg-black/40 p-1 space-x-1">
      <button 
        onClick={() => setConfig({ difficulty: 'normal' })}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${config.difficulty === 'normal' ? 'bg-pink-400 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
      >
        Normal
      </button>
      <button 
        onClick={() => setConfig({ difficulty: 'advanced' })}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${config.difficulty === 'advanced' ? 'bg-pink-400 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
      >
        Advanced
      </button>
    </div>
  );
}
