import { SecondSnapshot } from '@/types/typing';

export interface ChartDataPoint {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
  modifications: number;
}

export function transformSnapshotsToChartData(snapshots: SecondSnapshot[]): ChartDataPoint[] {
  return snapshots.map(snapshot => ({
    second: snapshot.second,
    wpm: snapshot.wpm,
    rawWpm: snapshot.rawWpm,
    errors: snapshot.errors,
    modifications: snapshot.modifications,
  }));
}
