import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { type DateFormat } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const getFormattedDate = (
  date: string,
  dateFormat: ValueOf<typeof DateFormat>,
  options = { locale: enUS } as { locale: Locale },
): string => {
  return format(new Date(date), dateFormat, options);
};

export { getFormattedDate };
