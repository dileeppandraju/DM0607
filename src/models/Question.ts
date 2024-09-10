export interface Question {
  uuid: string;
  cardId: string;
  topicId: string;
  conceptId: string;
  activityId: string;
  stageId: string;
  questionStatement: string;
  tutorialIntroInstruction: string;
  demoIntroInstruction: string;
  feedbackWhenWrong: string;
  instructionType: string; // defaults to "voice"
  choicesContent: string[];
  choicesAnswer: string[];
  answer: string;
  hint: string;
  feedback: string;
  cardDifficultyLevel: number;
  complexityPoints: number;
  timeLimit: number;
  mustAttemptInPractice: boolean; // in practice 
  mustAttemptInTest: boolean; // post test / pre test 
  isActive: boolean;
  version: string;
}

// export interface Question {
//   serialNumber: number;
//   questionStatement: string;
//   choices: number[];
//   correctAnswer: number;
//   textToSpeech: string;
//   activityType: string;
// }
