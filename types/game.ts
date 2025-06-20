export interface GameQuestion {
  id: string;
  text: string;
  category: string;
}

export interface GameCategory {
  id: string;
  name: {
    en: string;
    es: string;
    fr: string;
    pt: string;
    tr: string;
  };
  description: {
    en: string;
    es: string;
    fr: string;
    pt: string;
    tr: string;
  };
  color: string;
  icon: string;
  questions: {
    en: string[];
    es: string[];
    fr: string[];
    pt: string[];
    tr: string[];
  };
}

export interface GameState {
  currentCategory: GameCategory | null;
  currentQuestion: GameQuestion | null;
  questionIndex: number;
  usedQuestions: Set<string>;
}