 import {Realm} from 'realm';

export class ConceptSchema extends Realm.Object {
  uuid!: string;
  conceptId!: string;
  conceptName!: string;
  topicId!: string;
  conceptDifficulty!: number;
  priorityLevel!: number;
  isAvailable!: boolean;
  isReset!: boolean;
  gradeLevel!: number;
  version!: string;

  static schema = {
    name: 'Concept',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      conceptId: 'string',
      conceptName: 'string',
      topicId: 'string',
      conceptDifficulty: 'int',
      priorityLevel: 'int',
      isAvailable: 'bool',
      isReset: 'bool',
      gradeLevel: 'int',
      version: 'string',
    },
  };
}

export class ActivitySchema extends Realm.Object {
  uuid!: string;
  activityId!: string;
  topicId!: string;
  conceptId!: string;
  activityName!: string;
  activityDifficulty!: number;
  priorityLevel!: number;
  isAvailable!: boolean;
  isReset!: boolean;
  gradeLevel!: number;
  version!: string;

  static schema = {
    name: 'Activity',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      activityId: 'string',
      topicId: 'string',
      conceptId: 'string',
      activityName: 'string',
      activityDifficulty: 'int',
      priorityLevel: 'int',
      isAvailable: 'bool',
      isReset: 'bool',
      gradeLevel: 'int',
      version: 'string',
    },
  };
}

export class StageSchema extends Realm.Object {
  uuid!: string;
  stageId!: string;
  stageName!: string;
  topicId!: string;
  conceptId!: string;
  activityId!: string;
  priorityLevel!: number;
  stageDifficulty!: number;
  timeBucketPriorityLevel!: number;
  isPretest!: boolean;
  isSkippable!: boolean;
  isPostTest!: boolean;
  isAvailable!: boolean;
  isReset!: boolean;
  gradeLevel!: number;
  version!: string;

  static schema = {
    name: 'Stage',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      stageId: 'string',
      stageName: 'string',
      topicId: 'string',
      conceptId: 'string',
      activityId: 'string',
      priorityLevel: 'int',
      stageDifficulty: 'int',
      timeBucketPriorityLevel: 'int',
      isPretest: 'bool',
      isSkippable: 'bool',
      isPostTest: 'bool',
      isAvailable: 'bool',
      isReset: 'bool',
      gradeLevel: 'int',
      version: 'string',
    },
  };
}

export class Question extends Realm.Object {
  uuid!: string;
  cardId!: string;
  topicId!: string;
  conceptId!: string;
  activityId!: string;
  stageId!: string;
  questionStatement!: string;
  tutorialIntroInstruction!: string;
  demoIntroInstruction!: string;
  feedbackWhenWrong!: string;
  instructionType!: string; // defaults to "voice"
  choicesContent!: string[];
  choicesAnswer!: string[];
  answer!: string;
  hint!: string;
  feedback!: string;
  cardDifficultyLevel!: number;
  complexityPoints!: number;
  timeLimit!: number;
  mustAttemptInPractice!: boolean; // in practice 
  mustAttemptInTest!: boolean; // post test / pre test 
  isActive!: boolean;
  version!: string;

  static schema = {
    name: 'Question',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      cardId: 'string',
      topicId: 'string',
      conceptId: 'string',
      activityId: 'string',
      stageId: 'string',
      questionStatement: 'string',
      tutorialIntroInstruction: 'string',
      demoIntroInstruction: 'string',
      feedbackWhenWrong: 'string',
      instructionType: 'string',
      choicesContent: 'string[]',
      choicesAnswer: 'string[]',
      answer: 'string',
      hint: 'string',
      feedback: 'string',
      cardDifficultyLevel: 'int',
      complexityPoints: 'int',
      timeLimit: 'int',
      mustAttemptInPractice: 'bool',
      mustAttemptInTest: 'bool',
      isActive: 'bool',
      version: 'string',
    },
  };
}

// export class QuestionSchema extends Realm.Object {
//   serialNumber!: number;
//   questionStatement!: string;
//   choices!: number[];
//   correctAnswer!: number;
//   textToSpeech!: string;
//   activityType!: string;

//   static schema = {
//     name: 'Question',
//     primaryKey: 'serialNumber',
//     properties: {
//       serialNumber: 'int',
//       questionStatement: 'string',
//       choices: 'int[]',
//       correctAnswer: 'int',
//       textToSpeech: 'string',
//       activityType: 'string',
//     },
//   };
// }
