import { useState, useCallback } from 'react';
import { GameState, GameCategory, GameQuestion } from '@/types/game';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    currentCategory: null,
    currentQuestion: null,
    questionIndex: 0,
    usedQuestions: new Set(),
  });

  const startGame = useCallback((category: GameCategory) => {
    const shuffledQuestions = [...category.questions[]].sort(() => Math.random() - 0.5);
    const firstQuestion: GameQuestion = {
      id: `${category.id}-0`,
      text: shuffledQuestions[0],
      category: category.name,
    };

    setGameState({
      currentCategory: category,
      currentQuestion: firstQuestion,
      questionIndex: 0,
      usedQuestions: new Set([shuffledQuestions[0]]),
    });
  }, []);

  const getNextQuestion = useCallback(() => {
    if (!gameState.currentCategory) return;

    const availableQuestions = gameState.currentCategory.questions.filter(
      question => !gameState.usedQuestions.has(question)
    );

    if (availableQuestions.length === 0) {
      // Reset if all questions used
      setGameState(prev => ({
        ...prev,
        usedQuestions: new Set(),
        questionIndex: 0,
      }));
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const nextQuestionText = availableQuestions[randomIndex];
    const nextQuestion: GameQuestion = {
      id: `${gameState.currentCategory.id}-${gameState.questionIndex + 1}`,
      text: nextQuestionText,
      category: gameState.currentCategory.name,
    };

    setGameState(prev => ({
      ...prev,
      currentQuestion: nextQuestion,
      questionIndex: prev.questionIndex + 1,
      usedQuestions: new Set([...prev.usedQuestions, nextQuestionText]),
    }));
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      currentCategory: null,
      currentQuestion: null,
      questionIndex: 0,
      usedQuestions: new Set(),
    });
  }, []);

  return {
    gameState,
    startGame,
    getNextQuestion,
    resetGame,
  };
}