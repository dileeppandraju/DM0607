import create from 'zustand';
import Realm from 'realm';
// import {Question} from '../models/Question';
import { generateQuestions, getCurrentQuestion, saveQuestionsToRealm, clearQuestionsFromRealm } from '../services/QuestionService';
import { ActivityType } from '../enums/ActivityType';
import { devtools } from 'zustand/middleware';
import { getRealmInstance } from '../realmConfig';
import { Question, Concept, Activity, Stage } from '../models/schemas';

interface QuestionState {
  questions: Question[];
  concepts: Concept[];
  activities: Activity[];
  stages: Stage[];
  currentQuestionIndex: number;
  // selectedActivityType: ActivityType;
  selectedActivityType: string;
  generateQuestions: (count: number) => void;
  moveToNextQuestion: () => void;
  getCurrentQuestion: () => Question | null;
  clearQuestions: () => void; // Declare the new method in the interface
  // setActivityType: (activityType: ActivityType) => void;
  setActivityType: (activityType: string) => void;
}

export const useQuestionStore = create<QuestionState>((set, get) => ({
  questions: [],
  currentQuestionIndex: 0,
  selectedActivityType: ActivityType.DEFAULT,
  generateQuestions: (count) => {
    const questions = generateQuestions(count);
    saveQuestionsToRealm(questions);
    set({ questions });
  },
  moveToNextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex < questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },
  getCurrentQuestion: () => {
    const { currentQuestionIndex } = get();
    return getCurrentQuestion(currentQuestionIndex);
  },
  clearQuestions: () => {
    clearQuestionsFromRealm();
    set({questions: [], currentQuestionIndex: 0});
  },
  setActivityType: (activityType: ActivityType) => set({ selectedActivityType: activityType })
}));
