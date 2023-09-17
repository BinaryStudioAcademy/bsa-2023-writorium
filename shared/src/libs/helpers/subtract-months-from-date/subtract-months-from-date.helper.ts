import { subMonths } from 'date-fns';

const subtractMonthsFromDate = (
  dateSubtractFrom: Date,
  monthsCount: number,
): Date => {
  return subMonths(dateSubtractFrom, monthsCount);
};

export { subtractMonthsFromDate };
