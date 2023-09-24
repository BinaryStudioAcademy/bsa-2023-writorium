import {
  FIRST_INDEX,
  ONE_SPACE_DELIMITER,
  ZERO_COUNT,
} from '~/libs/constants/constants.js';

const SPECIAL_CHARACTERS_REGEX = /[^\s\w]/gi;
const EMPTY_SPACES_REGEX = /\s{2,}/g;

const makeFirstLettersCapitalized = (string: string): string => {
  const withoutSpecialCharactersString = string.replaceAll(
    SPECIAL_CHARACTERS_REGEX,
    ONE_SPACE_DELIMITER,
  );
  const withoutExtraSpacesString = withoutSpecialCharactersString
    .replaceAll(EMPTY_SPACES_REGEX, ONE_SPACE_DELIMITER)
    .trim();

  return withoutExtraSpacesString
    .split(ONE_SPACE_DELIMITER)
    .map((word) => {
      return `${word.charAt(ZERO_COUNT).toUpperCase()}${word.slice(
        FIRST_INDEX,
      )}`;
    })
    .join(ONE_SPACE_DELIMITER);
};

export { makeFirstLettersCapitalized };
