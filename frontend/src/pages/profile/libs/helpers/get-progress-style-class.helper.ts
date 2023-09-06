import { type ValueOf } from 'shared/build/index.js';

import { ProgressStatusClass } from '../enums/enums.js';

const getProgressStyleClass = (
  progress: number,
): ValueOf<typeof ProgressStatusClass> => {
  if (progress <= 0) {
    return ProgressStatusClass.NOT_STARTED;
  }

  if (progress >= 100) {
    return ProgressStatusClass.DONE;
  }

  return ProgressStatusClass.IN_PROGRESS;
};

export { getProgressStyleClass };
