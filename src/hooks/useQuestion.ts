import {useQuestionStore} from '../state/questionStore';
// import Realm from 'realm';

export const useQuestion = () => {
  const {
    questions,
    currentQuestionIndex,
    generateQuestions,
    moveToNextQuestion,
    getCurrentQuestion,
    setActivityType,
    selectedActivityType,
  } = useQuestionStore();

  return {
    questions,
    currentQuestionIndex,
    generateQuestions,
    moveToNextQuestion,
    getCurrentQuestion,
    setActivityType,
    selectedActivityType,
  };
};