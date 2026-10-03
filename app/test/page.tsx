import { TestContainer } from '@/components/typing/TestContainer';
import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400/30 font-sans flex flex-col items-center py-10 px-4 sm:px-8 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
      </div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center z-10 mb-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300">
              <span className="text-xl font-black text-black">M</span>
            </div>
            <span className="text-2xl font-black tracking-tight">WP<span className="text-yellow-400">Meong</span></span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 bg-zinc-900/80 px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400">
            <kbd className="px-2 py-0.5 bg-black/50 border border-white/10 rounded text-xs font-mono">tab</kbd>
            <span>+</span>
            <kbd className="px-2 py-0.5 bg-black/50 border border-white/10 rounded text-xs font-mono">enter</kbd>
            <span>- restart test</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col max-w-7xl mx-auto z-10">
        <TestContainer />
      </main>
    </div>
  );
}
