import {
  EMPTY_STRING,
  ONE_SPACE_DELIMITER,
  ZERO_COUNT,
} from '~/libs/constants/constants.js';

const getFirstLetters = (initialString: string): string => {
  return initialString
    .split(ONE_SPACE_DELIMITER)
    .map((word) => word.charAt(ZERO_COUNT))
    .join(EMPTY_STRING);
};

export { getFirstLetters };
