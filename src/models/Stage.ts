export interface Stage {
    uuid: string;
    stageId: string;
    stageName: string;
    topicId: string;
    conceptId: string;
    activityId: string;
    priorityLevel: number;
    stageDifficulty: number;
    timeBucketPriorityLevel: number;
    isPretest: boolean;
    isSkippable: boolean;
    isPostTest: boolean;
    isAvailable: boolean;
    isReset: boolean;
    gradeLevel: number;
    version: string;
  }
  