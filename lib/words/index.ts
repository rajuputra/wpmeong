import { enNormal } from './en-normal';
import { enAdvanced } from './en-advanced';
import { idNormal } from './id-normal';
import { idAdvanced } from './id-advanced';

const words = {
  en: {
    normal: enNormal,
    advanced: enAdvanced,
  },
  id: {
    normal: idNormal,
    advanced: idAdvanced,
  }
};

export function getRandomWords(language: 'id' | 'en', difficulty: 'normal' | 'advanced', count: number = 80): string {
  const wordList = words[language][difficulty];
  const selected = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    selected.push(wordList[randomIndex]);
  }
  return selected.join(' ');
}
