'use client';
import { useTypingStore } from '@/store/useTypingStore';

export function DurationPicker() {
  const { config, setConfig } = useTypingStore();

  return (
    <div className="flex rounded-md bg-black/40 p-1 space-x-1">
      <button 
        onClick={() => setConfig({ duration: 30 })}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${config.duration === 30 ? 'bg-yellow-400 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
      >
        30s
      </button>
      <button 
        onClick={() => setConfig({ duration: 60 })}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${config.duration === 60 ? 'bg-yellow-400 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
      >
        60s
      </button>
    </div>
  );
}
