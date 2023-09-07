import { getFormattedDate } from '~/libs/helpers/helpers.js';
import { type UserActivityResponseDto } from '~/packages/users/users.js';

const getUniqueMonths = (data: UserActivityResponseDto[]): string[] => {
  const months = data.map((activity) => getFormattedDate(activity.date, 'MMM'));

  return [...new Set(months)];
};

export { getUniqueMonths };
