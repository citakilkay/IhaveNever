import { atom } from 'jotai';
import { GameState, GameCategory, GameQuestion } from '@/types/game';

// Initial state
const initialGameState: GameState = {
  currentCategory: null,
  currentQuestion: null,
  questionIndex: 0,
  usedQuestions: new Set(),
};

// Atom to hold game state
export const gameStateAtom = atom<GameState>(initialGameState);

// Derived atoms for actions
export const startGameAtom = atom(
  null,
  (get, set, category: GameCategory) => {
    const shuffledQuestions = [...category.questions['en']].sort(() => Math.random() - 0.5);
    const firstQuestion: GameQuestion = {
      id: `${category.id}-0`,
      text: shuffledQuestions[0],
      category: category.name,
    };

    set(gameStateAtom, {
      currentCategory: category,
      currentQuestion: firstQuestion,
      questionIndex: 0,
      usedQuestions: new Set([shuffledQuestions[0]]),
    });
  }
);

export const getNextQuestionAtom = atom(
  null,
  (get, set) => {
    const currentState = get(gameStateAtom);
    if (!currentState.currentCategory) return;

    const availableQuestions = currentState.currentCategory.questions.filter(
      question => !currentState.usedQuestions.has(question)
    );

    if (availableQuestions.length === 0) {
      // Reset if all questions used
      set(gameStateAtom, {
        ...currentState,
        usedQuestions: new Set<string>(),
        questionIndex: 0,
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const nextQuestionText = availableQuestions[randomIndex];
    const nextQuestion: GameQuestion = {
      id: `${currentState.currentCategory.id}-${currentState.questionIndex + 1}`,
      text: nextQuestionText,
      category: currentState.currentCategory.name,
    };

    set(gameStateAtom, {
      ...currentState,
      currentQuestion: nextQuestion,
      questionIndex: currentState.questionIndex + 1,
      usedQuestions: new Set([...currentState.usedQuestions, nextQuestionText]),
    });
  }
);

export const resetGameAtom = atom(
  null,
  (_, set) => {
    set(gameStateAtom, initialGameState);
  }
);