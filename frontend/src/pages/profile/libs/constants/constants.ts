import { SUPPORTED_FILE_TYPES } from 'shared/build/index.js';

const SUPPORTED_FILE_TYPES_STRING = SUPPORTED_FILE_TYPES.join(', ');

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;
const NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY = 3;

export {
  NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY,
  PROGRESS_MAX,
  PROGRESS_MIN,
  SUPPORTED_FILE_TYPES_STRING,
};