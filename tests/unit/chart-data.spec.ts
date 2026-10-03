import { describe, it, expect } from 'vitest';
import { transformSnapshotsToChartData } from '../../lib/chart-data';
import { SecondSnapshot } from '../../types/typing';

describe('chart-data logic', () => {
  it('should transform empty snapshots correctly', () => {
    expect(transformSnapshotsToChartData([])).toEqual([]);
  });

  it('should transform snapshots to chart data points correctly', () => {
    const snapshots: SecondSnapshot[] = [
      { second: 1, wpm: 20, rawWpm: 25, errors: 0, modifications: 0 },
      { second: 2, wpm: 25, rawWpm: 30, errors: 1, modifications: 2 }
    ];

    const expected = [
      { second: 1, wpm: 20, rawWpm: 25, errors: 0, modifications: 0 },
      { second: 2, wpm: 25, rawWpm: 30, errors: 1, modifications: 2 }
    ];

    expect(transformSnapshotsToChartData(snapshots)).toEqual(expected);
  });
});
