export interface TypingState {
  targetText: string;
  currentIndex: number;
  typedChars: string;
  errors: number;
  modifications: number;
  status: 'idle' | 'running' | 'finished';
}

export function createInitialState(targetText: string): TypingState {
  return {
    targetText,
    currentIndex: 0,
    typedChars: '',
    errors: 0,
    modifications: 0,
    status: 'idle',
  };
}

export function processKeystroke(state: TypingState, key: string): TypingState {
  if (state.status === 'finished') {
    return state;
  }

  // Handle backspace
  if (key === 'Backspace') {
    if (state.currentIndex > 0) {
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        typedChars: state.typedChars.slice(0, -1),
        modifications: state.modifications + 1,
      };
    }
    return state;
  }

  // Handle normal character input
  if (key.length === 1) {
    const newState = { ...state };
    
    if (newState.status === 'idle') {
      newState.status = 'running';
    }

    if (key !== state.targetText[state.currentIndex]) {
      newState.errors += 1;
    }

    newState.typedChars += key;
    newState.currentIndex += 1;

    if (newState.currentIndex === state.targetText.length) {
      newState.status = 'finished';
    }

    return newState;
  }

  // Ignore other keys (Shift, Ctrl, etc.)
  return state;
}

export function calculateCorrectChars(state: TypingState): number {
  let correct = 0;
  for (let i = 0; i < state.typedChars.length; i++) {
    if (state.typedChars[i] === state.targetText[i]) {
      correct++;
    }
  }
  return correct;
}
