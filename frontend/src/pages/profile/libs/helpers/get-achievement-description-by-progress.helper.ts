import { type ParsedAchievementDescription } from '~/packages/achievements/achievements.js';

import { AchievementStatusThreshold } from '../enums/enums.js';

const getAchievementDescriptionByProgress = (
  progress: number,
  description: ParsedAchievementDescription,
): string => {
  if (progress < AchievementStatusThreshold.EARLY_STAGE) {
    return description.notStarted;
  }

  if (
    progress >= AchievementStatusThreshold.EARLY_STAGE &&
    progress < AchievementStatusThreshold.IN_PROGRESS
  ) {
    return description.earlyStage;
  }

  if (progress === AchievementStatusThreshold.DONE) {
    return description.done;
  }

  return description.inProgress;
};

export { getAchievementDescriptionByProgress };
