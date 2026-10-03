"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { signInWithGoogle, signOutUser } from "../lib/auth";

export default function Home() {
  const { user, isLoading, initAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => unsubscribe();
  }, [initAuth]);

  useEffect(() => {
    // Quick interactive key listener to mimic fast typing test readiness
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const primaryBtn = document.getElementById('start-test-btn');
        if (primaryBtn) {
          primaryBtn.classList.add('scale-95');
          setTimeout(() => primaryBtn.classList.remove('scale-95'), 150);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col justify-between selection:bg-red-500 selection:text-white relative overflow-x-hidden">
      {/* Background Layer: Clean Isometric Mechanical Keycaps Wireframe */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <svg 
          className="absolute inset-0 w-full h-full object-cover opacity-65"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="xMidYMid slice" 
          fill="none"
          style={{
            maskImage: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.75) 100%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.75) 100%)"
          }}
        >
          <defs>
            <pattern id="keycap-wireframe" width="280" height="240" patternUnits="userSpaceOnUse" patternTransform="rotate(-12) skewX(-8)">
              {/* Keycap 1 (Top-Left): Clear Foreground Keycap */}
              <g>
                {/* Base */}
                <rect x="8" y="8" width="124" height="104" rx="14" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.12" fill="none" />
                {/* Top Face */}
                <rect x="24" y="22" width="92" height="72" rx="8" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" fill="none" />
                {/* Perspective Bevel Lines */}
                <line x1="8" y1="8" x2="24" y2="22" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.20" />
                <line x1="132" y1="8" x2="116" y2="22" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.14" />
                <line x1="8" y1="112" x2="24" y2="94" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.14" />
                <line x1="132" y1="112" x2="116" y2="94" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.08" />
              </g>

              {/* Keycap 2 (Top-Right): Recessed / Softer Background Keycap */}
              <g>
                {/* Base */}
                <rect x="148" y="8" width="124" height="104" rx="14" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.06" fill="none" />
                {/* Top Face */}
                <rect x="164" y="22" width="92" height="72" rx="8" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.12" fill="none" />
                {/* Perspective Bevel Lines */}
                <line x1="148" y1="8" x2="164" y2="22" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.08" />
                <line x1="272" y1="8" x2="256" y2="22" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.06" />
                <line x1="148" y1="112" x2="164" y2="94" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.06" />
                <line x1="272" y1="112" x2="256" y2="94" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.04" />
              </g>

              {/* Keycap 3 (Bottom-Left): Subtle Mid-Depth Keycap */}
              <g>
                {/* Base */}
                <rect x="8" y="128" width="124" height="104" rx="14" stroke="#ffffff" strokeWidth="0.7" strokeOpacity="0.08" fill="none" />
                {/* Top Face */}
                <rect x="24" y="142" width="92" height="72" rx="8" stroke="#ffffff" strokeWidth="0.85" strokeOpacity="0.15" fill="none" />
                {/* Perspective Bevel Lines */}
                <line x1="8" y1="128" x2="24" y2="142" stroke="#ffffff" strokeWidth="0.65" strokeOpacity="0.10" />
                <line x1="132" y1="128" x2="116" y2="142" stroke="#ffffff" strokeWidth="0.65" strokeOpacity="0.07" />
                <line x1="8" y1="232" x2="24" y2="214" stroke="#ffffff" strokeWidth="0.65" strokeOpacity="0.07" />
                <line x1="132" y1="232" x2="116" y2="214" stroke="#ffffff" strokeWidth="0.65" strokeOpacity="0.05" />
              </g>

              {/* Keycap 4 (Bottom-Right): Balanced Depth Keycap */}
              <g>
                {/* Base */}
                <rect x="148" y="128" width="124" height="104" rx="14" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.10" fill="none" />
                {/* Top Face */}
                <rect x="164" y="142" width="92" height="72" rx="8" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.22" fill="none" />
                {/* Perspective Bevel Lines */}
                <line x1="148" y1="128" x2="164" y2="142" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.16" />
                <line x1="272" y1="128" x2="256" y2="142" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.11" />
                <line x1="148" y1="232" x2="164" y2="214" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.11" />
                <line x1="272" y1="232" x2="256" y2="214" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.07" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#keycap-wireframe)" />
        </svg>
      </div>

      {/* Header / Minimal Navigation */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm shadow-inner">
            <svg className="w-5 h-5 drop-shadow-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 10L3.5 4.5C3.2 3.7 4 3 4.8 3.3L9 5.2" fill="#FAFAFA" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M18.5 10L20.5 4.5C20.8 3.7 20 3 19.2 3.3L15 5.2" fill="#FAFAFA" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M4.5 4.2L6 7" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"></path>
              <path d="M19.5 4.2L18 7" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round"></path>
              <path d="M4.5 11C4.5 7.5 7.5 6 12 6C16.5 6 19.5 7.5 19.5 11C19.5 16 16.5 19.5 12 19.5C7.5 19.5 4.5 16 4.5 11Z" fill="#FAFAFA" stroke="#18181B" strokeWidth="1.2" strokeLinejoin="round"></path>
              <rect x="10.2" y="6.5" width="3.6" height="2.2" rx="0.6" fill="#09090B" stroke="#EF4444" strokeWidth="0.5"></rect>
              <circle cx="8.5" cy="11.5" r="1.2" fill="#18181B"></circle>
              <circle cx="15.5" cy="11.5" r="1.2" fill="#18181B"></circle>
              <circle cx="7" cy="13.2" r="1" fill="#FCA5A5" fillOpacity="0.7"></circle>
              <circle cx="17" cy="13.2" r="1" fill="#FCA5A5" fillOpacity="0.7"></circle>
              <path d="M11.5 13L12.5 13L12 13.6Z" fill="#EF4444"></path>
              <path d="M11 14.5C11.3 15 11.7 15 12 14.6C12.3 15 12.7 15 13 14.5" stroke="#18181B" strokeWidth="0.8" strokeLinecap="round" fill="none"></path>
            </svg>
          </div>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">WPMeong // v0.1</span>
        </div>

        {/* Quick stats teaser & user profile / audio switch */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          {user && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-zinc-300 font-medium">{user.displayName?.split(" ")[0] || "Meonger"}</span>
              </div>
              <button
                onClick={signOutUser}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 hover:border-red-500/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                title="Logout"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
          <button className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition" title="Sound Effects">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
          </button>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative z-10 w-full max-w-4xl mx-auto text-center">

        {/* 1. Mascot (Hero Graphic) */}
        <div className="relative group cursor-pointer mb-6 sm:mb-8">
          {/* Subtle focused ambient glow directly behind cat mascot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 bg-red-500/25 blur-[60px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-red-500/35 group-hover:scale-110" />
          
          {/* Interactive Bouncing SVG Mascot */}
          <div className="cat-mascot-card relative p-2">
            <svg className="w-40 h-40 sm:w-52 sm:h-52 drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)] animate-cat-float" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Subtle Shadow Disc */}
              <ellipse cx="110" cy="190" rx="65" ry="8" fill="#000000" fillOpacity="0.45"></ellipse>

              {/* Left Ear */}
              <path d="M42 90 L24 26 C22 20 28 15 34 18 L76 46 Z" fill="#FAFAFA" stroke="#18181B" strokeWidth="6" strokeLinejoin="round"></path>
              <path d="M44 80 L32 35 C31 32 34 30 37 32 L68 53 Z" fill="#F87171" fillOpacity="0.85"></path>

              {/* Right Ear */}
              <path d="M178 90 L196 26 C198 20 192 15 186 18 L144 46 Z" fill="#FAFAFA" stroke="#18181B" strokeWidth="6" strokeLinejoin="round"></path>
              <path d="M176 80 L188 35 C189 32 186 30 183 32 L152 53 Z" fill="#F87171" fillOpacity="0.85"></path>

              {/* Main Head Silhouette */}
              <path d="M34 104 C34 60 70 42 110 42 C150 42 186 60 186 104 C186 150 152 176 110 176 C68 176 34 150 34 104 Z" fill="#FAFAFA" stroke="#18181B" strokeWidth="6" strokeLinejoin="round"></path>

              {/* Cute Cheeks Blushing */}
              <circle cx="58" cy="120" r="11" fill="#FCA5A5" fillOpacity="0.55"></circle>
              <circle cx="162" cy="120" r="11" fill="#FCA5A5" fillOpacity="0.55"></circle>

              {/* Left Eye */}
              <g className="animate-blink origin-center">
                <circle cx="78" cy="98" r="9.5" fill="#18181B"></circle>
                <circle cx="75" cy="94.5" r="3.5" fill="#FFFFFF"></circle>
                <circle cx="81.5" cy="100.5" r="1.5" fill="#FFFFFF"></circle>
              </g>

              {/* Right Eye */}
              <g className="animate-blink origin-center">
                <circle cx="142" cy="98" r="9.5" fill="#18181B"></circle>
                <circle cx="139" cy="94.5" r="3.5" fill="#FFFFFF"></circle>
                <circle cx="145.5" cy="100.5" r="1.5" fill="#FFFFFF"></circle>
              </g>

              {/* Cute Little Triangle Nose */}
              <path d="M106 108 L114 108 C115 108 115.5 109 115 110 L110.8 114.5 C110.4 115 109.6 115 109.2 114.5 L105 110 C104.5 109 105 108 106 108 Z" fill="#EF4444"></path>

              {/* Playful Meow Mouth (':3' smile) */}
              <path d="M100 118 C103 123 108 123 110 117 C112 123 117 123 120 118" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" fill="none"></path>

              {/* Whiskers Left */}
              <path d="M22 112 L50 115" stroke="#18181B" strokeWidth="3" strokeLinecap="round"></path>
              <path d="M20 126 L48 123" stroke="#18181B" strokeWidth="3" strokeLinecap="round"></path>

              {/* Whiskers Right */}
              <path d="M198 112 L170 115" stroke="#18181B" strokeWidth="3" strokeLinecap="round"></path>
              <path d="M200 126 L172 123" stroke="#18181B" strokeWidth="3" strokeLinecap="round"></path>

              {/* Keyboard Keycap Crown */}
              <rect x="96" y="54" width="28" height="18" rx="4" fill="#09090B" stroke="#27272A" strokeWidth="2"></rect>
              <text x="110" y="66" fill="#EF4444" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">ESC</text>
            </svg>

            {/* Playful Click Me Tooltip on Mascot */}
            <div className="absolute -top-3 -right-2 sm:-right-4 bg-zinc-900 border border-zinc-700/80 shadow-lg px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-zinc-300 pointer-events-none group-hover:scale-110 group-hover:border-red-500/50 group-hover:text-red-400 transition-all duration-300 flex items-center gap-1">
              <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z"></path></svg>
              <span>meow!</span>
            </div>
          </div>
        </div>

        {/* 2. Typography / Wordmark */}
        <div className="space-y-3 mb-8 sm:mb-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl tracking-tight font-black leading-none select-none">
            <span className="text-white hover:text-zinc-200 transition-colors">WPM</span><span className="text-red-500 inline-block hover:scale-105 transition-transform duration-300">eong</span>
          </h1>
          
          <p className="text-gray-400 text-lg sm:text-xl md:text-2xl font-normal max-w-xl mx-auto tracking-normal">
            Tes kecepatan mengetikmu, <span className="text-zinc-200 font-medium italic">meow!</span>
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Mode: 15s • 30s • 60s
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-zinc-500 hidden sm:inline-flex">
              <kbd className="px-1 py-0.5 text-[10px] bg-zinc-800 rounded text-zinc-300 border border-zinc-700 mr-1">tab</kbd> + <kbd className="px-1 py-0.5 text-[10px] bg-zinc-800 rounded text-zinc-300 border border-zinc-700 ml-1">enter</kbd> <span className="ml-1">restart</span>
            </span>
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full ${user ? "max-w-xs" : "max-w-md"} mx-auto`}>
          <Link
            href="/test"
            id="start-test-btn"
            className={`group relative w-full ${user ? "sm:w-64" : "sm:flex-1"} h-14 inline-flex items-center justify-center gap-2.5 px-6 bg-white text-zinc-950 font-bold text-base rounded-2xl shadow-xl shadow-white/5 hover:bg-zinc-100 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10 active:translate-y-0 transition-all duration-200 cursor-pointer`}
          >
            <svg className="w-5 h-5 text-zinc-900 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3" ry="3"></rect><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M6 12h.001M10 12h.001M14 12h.001M18 12h.001M8 16h8"></path></svg>
            <span className="tracking-tight font-semibold">Mulai Tes</span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 bg-zinc-900 text-zinc-300 rounded ml-1">↵</span>
          </Link>
          
          {!user && (
            isLoading ? (
              <div className="w-full sm:flex-1 h-14 inline-flex items-center justify-center px-6 bg-zinc-900 text-zinc-400 font-semibold text-base rounded-2xl border border-gray-700">
                Loading...
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="w-full sm:flex-1 h-14 inline-flex items-center justify-center gap-2.5 px-6 bg-zinc-900 hover:bg-zinc-800/90 text-white font-semibold text-base rounded-2xl border border-gray-700 hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"></path><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"></path><path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"></path><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"></path></svg>
                <span className="tracking-tight whitespace-nowrap">Login Google</span>
              </button>
            )
          )}
        </div>

        {/* Subtle Feature Ribbon / Live Teaser */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-zinc-800/60 w-full max-w-xl grid grid-cols-3 gap-4 text-center">
          <div className="p-2 rounded-xl hover:bg-zinc-900/40 transition">
            <div className="text-zinc-500 text-xs font-mono uppercase mb-1">Akurasi</div>
            <div className="text-white font-bold font-mono text-sm sm:text-base flex items-center justify-center gap-1">
              <span className="text-emerald-400">99.2%</span>
            </div>
          </div>
          <div className="p-2 rounded-xl hover:bg-zinc-900/40 transition border-x border-zinc-800/50">
            <div className="text-zinc-500 text-xs font-mono uppercase mb-1">Global Record</div>
            <div className="text-white font-bold font-mono text-sm sm:text-base flex items-center justify-center gap-1">
              <span className="text-red-400">184</span> <span className="text-xs text-zinc-500 font-normal">WPM</span>
            </div>
          </div>
          <div className="p-2 rounded-xl hover:bg-zinc-900/40 transition">
            <div className="text-zinc-500 text-xs font-mono uppercase mb-1">Mechanical Feel</div>
            <div className="text-white font-bold font-mono text-sm sm:text-base flex items-center justify-center gap-1">
              <span className="">Cherry MX</span>
            </div>
          </div>
        </div>

      </main>

      {/* Clean Minimalist Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-3 relative z-10 border-t border-zinc-900/80">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-medium">WPMeong</span>
          <span className="">•</span>
          <span className="">Built for speed, focus & paw precision.</span>
        </div>
        <div className="flex items-center gap-5 text-zinc-500 font-mono">
          <a href="#" className="hover:text-zinc-300 transition">leaderboard</a>
          <a href="#" className="hover:text-zinc-300 transition">custom test</a>
          <a href="#" className="hover:text-zinc-300 transition">keyboard sound</a>
          <span className="text-zinc-700">|</span>
          <span className="">tekan <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 border border-zinc-700">space</kbd> untuk mulai</span>
        </div>
      </footer>
    </div>
  );
}
