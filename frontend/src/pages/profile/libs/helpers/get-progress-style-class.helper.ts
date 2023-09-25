import { type ValueOf } from '~/libs/types/types.js';

import {
  AchievementStatusThreshold,
  ProgressStatusClass,
} from '../enums/enums.js';

const getProgressStyleClass = (
  progress: number,
): ValueOf<typeof ProgressStatusClass> => {
  if (progress < AchievementStatusThreshold.EARLY_STAGE) {
    return ProgressStatusClass.NOT_STARTED;
  }

  if (
    progress >= AchievementStatusThreshold.EARLY_STAGE &&
    progress < AchievementStatusThreshold.IN_PROGRESS
  ) {
    return ProgressStatusClass.EARLY_STAGE;
  }

  if (progress === AchievementStatusThreshold.DONE) {
    return ProgressStatusClass.DONE;
  }

  return ProgressStatusClass.IN_PROGRESS;
};

export { getProgressStyleClass };
