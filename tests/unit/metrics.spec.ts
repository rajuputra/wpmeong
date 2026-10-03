import { describe, it, expect } from 'vitest';
import { calculateWpm, calculateRawWpm, calculateAccuracy, calculateConsistency } from '../../lib/metrics';
import { SecondSnapshot } from '../../types/typing';

describe('metrics logic', () => {
  describe('calculateWpm', () => {
    it('should calculate wpm correctly for normal case', () => {
      // 100 correct chars in 60 seconds (1 minute) = 20 WPM
      expect(calculateWpm(100, 60)).toBe(20);
    });

    it('should handle zero duration', () => {
      expect(calculateWpm(100, 0)).toBe(0);
    });

    it('should calculate wpm correctly for 30s', () => {
      // 100 correct chars in 30 seconds (0.5 minute) = 40 WPM
      expect(calculateWpm(100, 30)).toBe(40);
    });
  });

  describe('calculateRawWpm', () => {
    it('should calculate raw wpm correctly for normal case', () => {
      // 120 total chars in 60 seconds (1 minute) = 24 Raw WPM
      expect(calculateRawWpm(120, 60)).toBe(24);
    });

    it('should handle zero duration', () => {
      expect(calculateRawWpm(120, 0)).toBe(0);
    });

    it('should calculate raw wpm correctly for 30s', () => {
      expect(calculateRawWpm(120, 30)).toBe(48);
    });
  });

  describe('calculateAccuracy', () => {
    it('should calculate accuracy correctly', () => {
      expect(calculateAccuracy(95, 100)).toBe(95.0);
    });

    it('should return 0 when total chars is 0', () => {
      expect(calculateAccuracy(0, 0)).toBe(0);
    });

    it('should round accuracy to 1 decimal place', () => {
      // 98 / 103 = 0.951456... -> 95.1
      expect(calculateAccuracy(98, 103)).toBe(95.1);
    });
  });

  describe('calculateConsistency', () => {
    it('should return 100 if snapshots are less than 2', () => {
      expect(calculateConsistency([])).toBe(100);
      expect(calculateConsistency([{ wpm: 50, second: 1, rawWpm: 50, errors: 0, modifications: 0 }])).toBe(100);
    });

    it('should calculate consistency for perfectly consistent snapshots', () => {
      const snapshots: SecondSnapshot[] = [
        { wpm: 50, second: 1, rawWpm: 50, errors: 0, modifications: 0 },
        { wpm: 50, second: 2, rawWpm: 50, errors: 0, modifications: 0 },
        { wpm: 50, second: 3, rawWpm: 50, errors: 0, modifications: 0 },
      ];
      // Variance = 0, Stdev = 0, CV = 0 -> Consistency = 100
      expect(calculateConsistency(snapshots)).toBe(100);
    });

    it('should calculate consistency for varying snapshots', () => {
      const snapshots: SecondSnapshot[] = [
        { wpm: 40, second: 1, rawWpm: 40, errors: 0, modifications: 0 },
        { wpm: 50, second: 2, rawWpm: 50, errors: 0, modifications: 0 },
        { wpm: 60, second: 3, rawWpm: 60, errors: 0, modifications: 0 },
      ];
      // Mean = 50. Variance = ((40-50)^2 + (50-50)^2 + (60-50)^2)/3 = (100 + 0 + 100)/3 = 66.67
      // Stdev = sqrt(66.67) = 8.165
      // CV = (8.165 / 50) * 100 = 16.33
      // Consistency = 100 - 16.33 = 83.67 -> 83.7
      expect(calculateConsistency(snapshots)).toBe(83.7);
    });

    it('should clamp consistency between 0 and 100', () => {
      const snapshots: SecondSnapshot[] = [
        { wpm: 10, second: 1, rawWpm: 10, errors: 0, modifications: 0 },
        { wpm: 100, second: 2, rawWpm: 100, errors: 0, modifications: 0 },
        { wpm: 10, second: 3, rawWpm: 10, errors: 0, modifications: 0 },
      ];
      // Mean = 40.
      // Variance = ((10-40)^2 + (100-40)^2 + (10-40)^2)/3 = (900 + 3600 + 900)/3 = 1800
      // Stdev = sqrt(1800) = 42.426
      // CV = (42.426 / 40) * 100 = 106.06
      // Consistency = 100 - 106.06 = -6.06 -> Clamped to 0
      expect(calculateConsistency(snapshots)).toBe(0);
    });
  });
});
