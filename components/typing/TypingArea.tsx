'use client';

import { useEffect } from 'react';
import { useTypingStore } from '@/store/useTypingStore';

export function TypingArea() {
  const { engineState, processKey } = useTypingStore();
  const { targetText, typedChars, currentIndex, status } = engineState;

  useEffect(() => {
    // We assume startTest is called elsewhere (e.g. from page or reset button)
    // to allow config changes to apply before starting
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for space and backspace
      if (e.key === ' ' || e.key === 'Backspace') {
        e.preventDefault();
      }
      
      // Ignore if modifier keys are pressed
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      
      if (e.key.length === 1 || e.key === 'Backspace') {
        processKey(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [processKey]);

  if (!targetText) return null;

  const words = targetText.split(' ');

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-4 text-3xl font-mono text-gray-500/50 leading-relaxed max-w-4xl mx-auto focus:outline-none" tabIndex={0}>
      {words.map((word, wIdx) => {
        const wordStartIdx = words.slice(0, wIdx).reduce((acc, w) => acc + w.length + 1, 0);

        return (
          <div key={wIdx} className="flex">
            {word.split('').map((char, cIdx) => {
              const charIndex = wordStartIdx + cIdx;
              const typedChar = typedChars[charIndex];
              
              let charColor = '';
              if (typedChar !== undefined) {
                if (typedChar === char) {
                  charColor = 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]';
                } else {
                  charColor = 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]';
                }
              }
              
              const isCursor = charIndex === currentIndex && status !== 'finished';
              
              return (
                <span key={cIdx} className={`${charColor} relative transition-colors duration-75`}>
                  {isCursor && <span className="absolute -left-[1px] top-1/2 -translate-y-1/2 h-[80%] w-[2px] bg-yellow-400 animate-pulse rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>}
                  {char}
                </span>
              );
            })}
            
            {/* The space after the word */}
            {wIdx < words.length - 1 && (
              <span className="relative flex items-center">
                {currentIndex === wordStartIdx + word.length && status !== 'finished' && (
                  <span className="absolute left-[2px] top-1/2 -translate-y-1/2 h-[80%] w-[2px] bg-yellow-400 animate-pulse rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
                )}
                <span className={`w-3 inline-block transition-colors duration-75 ${
                  typedChars[wordStartIdx + word.length] !== undefined 
                    ? typedChars[wordStartIdx + word.length] === ' ' 
                      ? '' 
                      : 'bg-red-400/30'
                    : ''
                }`}>
                  &nbsp;
                </span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
