import { differenceInDays } from 'date-fns';

const getDifferenceBetweenDates = (
  closerDate: Date,
  furtherDate: Date,
): number => {
  return differenceInDays(closerDate, furtherDate);
};

export { getDifferenceBetweenDates };
