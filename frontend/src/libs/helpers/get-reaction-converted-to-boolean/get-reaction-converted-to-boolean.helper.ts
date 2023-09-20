import { Reaction } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const getReactionConvertedToBoolean = (
  reaction: ValueOf<typeof Reaction>,
): boolean => {
  return reaction === Reaction.LIKE;
};

export { getReactionConvertedToBoolean };
