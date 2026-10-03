'use client';
import { useTypingStore } from '@/store/useTypingStore';

export function LanguagePicker() {
  const { config, setConfig } = useTypingStore();

  return (
    <div className="flex rounded-md bg-black/40 p-1 space-x-1">
      <button 
        onClick={() => setConfig({ language: 'id' })}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${config.language === 'id' ? 'bg-blue-400 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
      >
        ID
      </button>
      <button 
        onClick={() => setConfig({ language: 'en' })}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${config.language === 'en' ? 'bg-blue-400 text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
      >
        EN
      </button>
    </div>
  );
}
