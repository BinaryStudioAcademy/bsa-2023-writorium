import { format } from 'date-fns';

import { type DateFormat } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const getFormattedDate = (
  date: string,
  dateFormat: ValueOf<typeof DateFormat>,
): string => {
  return format(new Date(date), dateFormat);
};

export { getFormattedDate };
