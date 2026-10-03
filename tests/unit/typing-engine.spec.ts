import { describe, it, expect } from 'vitest';
import { createInitialState, processKeystroke, calculateCorrectChars } from '../../lib/typing-engine';

describe('typing-engine logic', () => {
  const targetText = 'hello world';

  describe('createInitialState', () => {
    it('should initialize correctly', () => {
      const state = createInitialState(targetText);
      expect(state.targetText).toBe(targetText);
      expect(state.currentIndex).toBe(0);
      expect(state.typedChars).toBe('');
      expect(state.errors).toBe(0);
      expect(state.modifications).toBe(0);
      expect(state.status).toBe('idle');
    });
  });

  describe('processKeystroke', () => {
    it('should start running on first keystroke', () => {
      let state = createInitialState(targetText);
      state = processKeystroke(state, 'h');
      expect(state.status).toBe('running');
      expect(state.currentIndex).toBe(1);
      expect(state.typedChars).toBe('h');
    });

    it('should ignore modifier keys like Shift', () => {
      let state = createInitialState(targetText);
      state = processKeystroke(state, 'Shift');
      expect(state.status).toBe('idle');
      expect(state.currentIndex).toBe(0);
    });

    it('should handle backspace correctly', () => {
      let state = createInitialState(targetText);
      state = processKeystroke(state, 'h');
      state = processKeystroke(state, 'e');
      state = processKeystroke(state, 'Backspace');
      
      expect(state.currentIndex).toBe(1);
      expect(state.typedChars).toBe('h');
      expect(state.modifications).toBe(1);
    });

    it('should not backspace below 0', () => {
      let state = createInitialState(targetText);
      state = processKeystroke(state, 'Backspace');
      
      expect(state.currentIndex).toBe(0);
      expect(state.modifications).toBe(0);
    });

    it('should track errors correctly', () => {
      let state = createInitialState(targetText);
      state = processKeystroke(state, 'x'); // error
      expect(state.errors).toBe(1);
      state = processKeystroke(state, 'e'); // correct
      expect(state.errors).toBe(1);
      state = processKeystroke(state, 'l'); // correct
      state = processKeystroke(state, 'p'); // error
      expect(state.errors).toBe(2);
    });

    it('should finish when target text is completed', () => {
      let state = createInitialState('hi');
      state = processKeystroke(state, 'h');
      expect(state.status).toBe('running');
      state = processKeystroke(state, 'i');
      expect(state.status).toBe('finished');
      expect(state.currentIndex).toBe(2);
    });

    it('should ignore keystrokes after finishing', () => {
      let state = createInitialState('a');
      state = processKeystroke(state, 'a');
      expect(state.status).toBe('finished');
      state = processKeystroke(state, 'b');
      expect(state.currentIndex).toBe(1);
      expect(state.typedChars).toBe('a');
    });
  });

  describe('calculateCorrectChars', () => {
    it('should calculate correct chars accurately', () => {
      let state = createInitialState(targetText);
      state = processKeystroke(state, 'h');
      state = processKeystroke(state, 'x'); // error
      state = processKeystroke(state, 'l');
      
      expect(calculateCorrectChars(state)).toBe(2); // 'h', 'l'
    });
  });
});
