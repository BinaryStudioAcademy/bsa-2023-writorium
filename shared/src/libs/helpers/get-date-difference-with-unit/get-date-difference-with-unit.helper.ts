import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';

import { TimeUnit } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type ReturnValue = {
  diff: number;
  unit: ValueOf<typeof TimeUnit>;
};

const getDateDifferenceWithUnit = (date: string): ReturnValue => {
  const currentDate = new Date();
  const endpointDate = new Date(date);

  const diffInDays = differenceInDays(currentDate, endpointDate);
  if (diffInDays) {
    return { diff: diffInDays, unit: TimeUnit.DAY };
  }

  const diffInHours = differenceInHours(currentDate, endpointDate);
  if (diffInHours) {
    return { diff: diffInHours, unit: TimeUnit.HOUR };
  }

  const diffInMinutes = differenceInMinutes(currentDate, endpointDate);
  if (diffInMinutes) {
    return { diff: diffInMinutes, unit: TimeUnit.MINUTE };
  }

  const diffInSeconds = differenceInSeconds(currentDate, endpointDate);
  return { diff: diffInSeconds, unit: TimeUnit.SECOND };
};

export { getDateDifferenceWithUnit };
