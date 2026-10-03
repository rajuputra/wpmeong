'use client';

import { useEffect } from 'react';
import { useTypingStore } from '@/store/useTypingStore';

export function Timer() {
  const { timer, engineState, tickTimer } = useTypingStore();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (engineState.status === 'running') {
      intervalId = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [engineState.status, tickTimer]);

  return (
    <div className="flex items-center space-x-2 text-2xl font-mono text-yellow-400">
      <span className="drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
        {timer}s
      </span>
    </div>
  );
}
