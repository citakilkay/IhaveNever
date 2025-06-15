export interface GameQuestion {
  id: string;
  text: string;
  category: string;
}

export interface GameCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  questions: string[];
}

export interface GameState {
  currentCategory: GameCategory | null;
  currentQuestion: GameQuestion | null;
  questionIndex: number;
  usedQuestions: Set<string>;
}