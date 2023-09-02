import { ConvertedTimeUnit, TimeKeyword } from './enums/enums.js';

const getTimeFromCreation = (isoDate: string): string => {
  const date = new Date(isoDate);
  const minutesFromCreation = Math.round(
    (Date.now() - date.getTime()) / ConvertedTimeUnit.MINUTE_IN_MILISECONDS,
  );

  if (minutesFromCreation < 1) {
    return `less than 1 ${TimeKeyword.MINUTE}`;
  }

  const hoursFromCreation = Math.round(
    minutesFromCreation / ConvertedTimeUnit.HOUR_IN_MINUTES,
  );

  if (hoursFromCreation < 1) {
    const keyword =
      minutesFromCreation === 1 ? TimeKeyword.MINUTE : TimeKeyword.MINUTES;

    return `${minutesFromCreation} ${keyword}`;
  }

  const keyword =
    hoursFromCreation === 1 ? TimeKeyword.HOUR : TimeKeyword.HOURS;

  return `${hoursFromCreation} ${keyword}`;
};

export { getTimeFromCreation };
