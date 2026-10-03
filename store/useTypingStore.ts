import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TypingState, createInitialState, processKeystroke, calculateCorrectChars } from '@/lib/typing-engine';
import { calculateWpm, calculateRawWpm, calculateAccuracy, calculateConsistency } from '@/lib/metrics';
import { SecondSnapshot, TestConfig, TestResult } from '@/types/typing';
import { getRandomWords } from '@/lib/words';

interface TypingStore {
  config: TestConfig;
  engineState: TypingState;
  snapshots: SecondSnapshot[];
  timer: number;
  result: TestResult | null;
  
  setConfig: (config: Partial<TestConfig>) => void;
  startTest: () => void;
  processKey: (key: string) => void;
  tickTimer: () => void;
  resetTest: () => void;
}

export const useTypingStore = create<TypingStore>()(
  persist(
    (set, get) => ({
      config: {
        duration: 60,
        language: 'id',
        difficulty: 'normal',
      },
      engineState: createInitialState(''),
      snapshots: [],
      timer: 60,
      result: null,

      setConfig: (newConfig) => {
        set((state) => {
          const mergedConfig = { ...state.config, ...newConfig };
          return { 
            config: mergedConfig,
            timer: mergedConfig.duration,
          };
        });
        get().resetTest();
      },
      
      startTest: () => set((state) => {
        const text = getRandomWords(state.config.language, state.config.difficulty, state.config.duration === 60 ? 150 : 80);
        return {
          engineState: createInitialState(text),
          snapshots: [],
          timer: state.config.duration,
          result: null
        };
      }),

  processKey: (key) => set((state) => {
    if (state.timer === 0 || state.engineState.status === 'finished' || state.result) {
      return state;
    }
    
    // Ignore keys like shift, ctrl, etc. handled by engine
    const newState = processKeystroke(state.engineState, key);

    if (newState.status === 'finished') {
      const secondElapsed = state.config.duration - state.timer;
      // Guard against division by 0 if they finish in 0 seconds (impossible but safe)
      const safeElapsed = Math.max(1, secondElapsed);
      const correctChars = calculateCorrectChars(newState);
      const totalChars = newState.typedChars.length;
      
      const wpm = calculateWpm(correctChars, safeElapsed);
      const rawWpm = calculateRawWpm(totalChars, safeElapsed);
      const accuracy = calculateAccuracy(correctChars, totalChars);
      const consistency = calculateConsistency(state.snapshots);
      
      return {
        engineState: newState,
        result: {
          wpm,
          rawWpm,
          accuracy,
          consistency,
          correctChars,
          incorrectChars: newState.errors,
          modifications: newState.modifications,
          snapshots: state.snapshots,
        }
      };
    }

    return { engineState: newState };
  }),

  tickTimer: () => set((state) => {
    if (state.engineState.status !== 'running' || state.timer <= 0) {
      return state;
    }

    const newTimer = state.timer - 1;
    const secondElapsed = state.config.duration - newTimer;
    
    const correctChars = calculateCorrectChars(state.engineState);
    const totalChars = state.engineState.typedChars.length;
    
    const currentWpm = calculateWpm(correctChars, secondElapsed);
    const currentRawWpm = calculateRawWpm(totalChars, secondElapsed);

    const snapshot: SecondSnapshot = {
      second: secondElapsed,
      wpm: currentWpm,
      rawWpm: currentRawWpm,
      errors: state.engineState.errors,
      modifications: state.engineState.modifications,
    };

    const newSnapshots = [...state.snapshots, snapshot];

    if (newTimer === 0) {
      const finalWpm = calculateWpm(correctChars, state.config.duration);
      const finalRawWpm = calculateRawWpm(totalChars, state.config.duration);
      const accuracy = calculateAccuracy(correctChars, totalChars);
      const consistency = calculateConsistency(newSnapshots);
      
      return {
        timer: newTimer,
        snapshots: newSnapshots,
        engineState: { ...state.engineState, status: 'finished' as const },
        result: {
          wpm: finalWpm,
          rawWpm: finalRawWpm,
          accuracy,
          consistency,
          correctChars,
          incorrectChars: state.engineState.errors,
          modifications: state.engineState.modifications,
          snapshots: newSnapshots,
        }
      };
    }

    return { timer: newTimer, snapshots: newSnapshots };
  }),

      resetTest: () => set((state) => {
        const text = getRandomWords(state.config.language, state.config.difficulty, state.config.duration === 60 ? 150 : 80);
        return {
          engineState: createInitialState(text),
          snapshots: [],
          timer: state.config.duration,
          result: null
        };
      }),
    }),
    {
      name: 'wpmeong-config',
      partialize: (state) => ({ config: state.config }),
    }
  )
);
