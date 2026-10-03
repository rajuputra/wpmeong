export interface SecondSnapshot {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
  modifications: number;
}

export interface TestConfig {
  duration: 30 | 60;
  language: 'id' | 'en';
  difficulty: 'normal' | 'advanced';
}

export interface TestResult {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  correctChars: number;
  incorrectChars: number;
  modifications: number;
  snapshots: SecondSnapshot[];
}
