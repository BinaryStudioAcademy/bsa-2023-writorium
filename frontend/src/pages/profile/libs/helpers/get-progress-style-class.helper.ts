import { type ValueOf } from '~/libs/types/types.js';

import { PROGRESS_MAX, PROGRESS_MIN } from '../constants/constants.js';
import { ProgressStatusClass } from '../enums/enums.js';

const getProgressStyleClass = (
  progress: number,
): ValueOf<typeof ProgressStatusClass> => {
  if (progress <= PROGRESS_MIN) {
    return ProgressStatusClass.NOT_STARTED;
  }

  if (progress >= PROGRESS_MAX) {
    return ProgressStatusClass.DONE;
  }

  return ProgressStatusClass.IN_PROGRESS;
};

export { getProgressStyleClass };
