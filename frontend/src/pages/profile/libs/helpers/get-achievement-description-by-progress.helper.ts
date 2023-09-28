import { type ParsedAchievementDescription } from '~/packages/achievements/achievements.js';

import { AchievementDescriptionThreshold } from '../enums/enums.js';

const getAchievementDescriptionByProgress = (
  progress: number,
  description: ParsedAchievementDescription,
): string => {
  if (progress < AchievementDescriptionThreshold.EARLY_STAGE) {
    return description.notStarted;
  }

  if (
    progress >= AchievementDescriptionThreshold.EARLY_STAGE &&
    progress < AchievementDescriptionThreshold.IN_PROGRESS
  ) {
    return description.earlyStage;
  }

  if (progress === AchievementDescriptionThreshold.DONE) {
    return description.done;
  }

  return description.inProgress;
};

export { getAchievementDescriptionByProgress };
