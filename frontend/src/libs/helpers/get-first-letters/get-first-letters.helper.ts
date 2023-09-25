import { FIRST_ELEMENT_ARRAY_INDEX } from '~/libs/constants/constants.js';

const getFirstLetters = (initialString: string): string => {
  return initialString
    .split(' ')
    .map((word) => word.charAt(FIRST_ELEMENT_ARRAY_INDEX))
    .join('');
};

export { getFirstLetters };
