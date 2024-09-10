import Realm from 'realm';
// import {Question} from '../models/Question';
import {Question} from '../models/schemas';
import { getRealmInstance } from '../realmConfig';

export const generateQuestion = (serialNumber: number): Question => {
  let num1 = Math.floor(Math.random() * 100) + 1;
  let num2 = Math.floor(Math.random() * 100) + 1;
  let num3 = Math.floor(Math.random() * 100) + 1;

  // Ensure all numbers are unique
  while (num2 === num1) {
    num2 = Math.floor(Math.random() * 100) + 1;
  }
  while (num3 === num1 || num3 === num2) {
    num3 = Math.floor(Math.random() * 100) + 1;
  }

  const correctAnswer = Math.max(num1, num2, num3);
  const questionStatement = `Which is the biggest number among ${num1}, ${num2}, and ${num3}?`;

  return {
    uuid: Math.random().toString(),
    cardId: `card-${serialNumber}`,
    topicId: 'topic-1',
    conceptId: 'concept-1',
    activityId: 'activity-1',
    stageId: 'stage-1',
    questionStatement,
    tutorialIntroInstruction: 'This is how you solve the problem...',
    demoIntroInstruction: 'Let me show you...',
    feedbackWhenWrong: 'Try again...',
    instructionType: 'voice',
    choicesContent: [`${num1}`, `${num2}`, `${num3}`],
    choicesAnswer: [`${num1}`, `${num2}`, `${num3}`],
    answer: `${correctAnswer}`,
    hint: 'Think carefully...',
    feedback: 'Well done!',
    cardDifficultyLevel: 1,
    complexityPoints: 10,
    timeLimit: 30,
    mustAttemptInPractice: true,
    mustAttemptInTest: true,
    isActive: true,
    version: '1.0.0',
  };
};

export const generateQuestions = (count: number): Question[] => {
  const questions: Question[] = [];
  for (let i = 1; i <= count; i++) {
    questions.push(generateQuestion(i));
  }
  return questions;
};

export const getCurrentQuestion = (currentQuestionIndex: number): Question | null => {
  const realm = getRealmInstance();
  const questions = realm.objects<Question>('Question');
  if (currentQuestionIndex < questions.length) {
    return questions[currentQuestionIndex];
  }
  return null;
};

export const saveQuestionsToRealm = (questions: Question[]): void => {
  const realm = getRealmInstance();
  realm.write(() => {
    questions.forEach(question => {
      realm.create('Question', question);
    });
  });
};

export const clearQuestionsFromRealm = () => {
  const realm = getRealmInstance();
  realm.write(() => {
    const allQuestions = realm.objects('Question');
    realm.delete(allQuestions);
  });
};
