import { SecondSnapshot } from '@/types/typing';

export function calculateWpm(correctChars: number, durationSec: number): number {
  if (durationSec === 0) return 0;
  const durationMin = durationSec / 60;
  return Math.round((correctChars / 5) / durationMin);
}

export function calculateRawWpm(totalChars: number, durationSec: number): number {
  if (durationSec === 0) return 0;
  const durationMin = durationSec / 60;
  return Math.round((totalChars / 5) / durationMin);
}

export function calculateAccuracy(correctChars: number, totalChars: number): number {
  if (totalChars === 0) return 0;
  const accuracy = (correctChars / totalChars) * 100;
  return Math.round(accuracy * 10) / 10;
}

export function calculateConsistency(snapshots: SecondSnapshot[]): number {
  if (snapshots.length < 2) return 100;

  const wpms = snapshots.map(s => s.wpm);
  const mean = wpms.reduce((sum, wpm) => sum + wpm, 0) / wpms.length;
  
  if (mean === 0) return 100;

  const variance = wpms.reduce((sum, wpm) => sum + Math.pow(wpm - mean, 2), 0) / wpms.length;
  const stdev = Math.sqrt(variance);

  const cv = (stdev / mean) * 100;
  const consistency = 100 - cv;

  return Math.max(0, Math.min(100, Math.round(consistency * 10) / 10));
}
