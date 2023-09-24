import { DateFormat } from '~/libs/enums/enums.js';
import { getFormattedDate } from '~/libs/helpers/helpers.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

const getUniqueMonths = (activities: UserActivityResponseDto[]): string[] => {
  const months = activities.map((activity) => {
    return getFormattedDate(activity.date, DateFormat.SHORT_MONTH);
  });

  return [...new Set(months)];
};

export { getUniqueMonths };
