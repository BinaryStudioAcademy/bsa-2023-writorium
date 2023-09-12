import { SUPPORTED_FILE_TYPES } from '~/libs/constants/constants.js';

const SUPPORTED_FILE_TYPES_STRING = SUPPORTED_FILE_TYPES.join(', ');

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;
const NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY = 3;

const DATE_LOCALE = 'en-US';
const DATE_OPTIONS = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;

export {
  DATE_LOCALE,
  DATE_OPTIONS,
  NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY,
  PROGRESS_MAX,
  PROGRESS_MIN,
  SUPPORTED_FILE_TYPES_STRING,
};
