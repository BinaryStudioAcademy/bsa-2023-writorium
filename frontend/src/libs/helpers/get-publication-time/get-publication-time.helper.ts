import { type TimeUnit } from '~/libs/enums/enums.js';
import { makePluralOrSingular } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

const getPublicationTime = (
  time: number,
  unit: ValueOf<typeof TimeUnit>,
): string => {
  return `${time} ${makePluralOrSingular(unit, time)}`;
};

export { getPublicationTime };
