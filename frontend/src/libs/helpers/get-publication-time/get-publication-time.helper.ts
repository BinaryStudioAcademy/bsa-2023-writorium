import { type TimeUnit } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const getPublicationTime = (
  time: number,
  unit: ValueOf<typeof TimeUnit>,
): string => {
  const isPlural = time > 1;

  return `${time} ${unit}${isPlural ? 's' : ''}`;
};

export { getPublicationTime };
