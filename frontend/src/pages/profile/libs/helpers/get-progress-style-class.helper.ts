import { type ValueOf } from '~/libs/types/types.js';
import { PercentageProgress } from '~/packages/achievements/achievements.js';

import { ProgressStatusClass } from '../enums/enums.js';

const getProgressStyleClass = (
  progress: number,
): ValueOf<typeof ProgressStatusClass> => {
  if (progress <= PercentageProgress.MIN) {
    return ProgressStatusClass.NOT_STARTED;
  }

  if (progress >= PercentageProgress.MAX) {
    return ProgressStatusClass.DONE;
  }

  return ProgressStatusClass.IN_PROGRESS;
};

export { getProgressStyleClass };
