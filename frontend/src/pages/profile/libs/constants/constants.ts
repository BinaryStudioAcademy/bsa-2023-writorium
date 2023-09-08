import { SUPPORTED_FILE_TYPES } from '~/libs/constants/constants.js';

const SUPPORTED_FILE_TYPES_STRING = SUPPORTED_FILE_TYPES.join(', ');

const PROGRESS_MIN = 0;
const PROGRESS_MAX = 100;
const NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY = 3;

const ACTIVITY_BREAKPOINTS = {
  breakpoint1: 'breakpoint1',
  breakpoint2: 'breakpoint2',
  breakpoint3: 'breakpoint3',
  breakpoint4: 'breakpoint4',
} as const;

const ACTIVITY_THRESHOLDS = {
  threshold1: 0,
  threshold2: 1,
  threshold3: 3,
} as const;

export {
  ACTIVITY_BREAKPOINTS,
  ACTIVITY_THRESHOLDS,
  NUMBER_OF_ACHIEVEMENTS_TO_DISPLAY,
  PROGRESS_MAX,
  PROGRESS_MIN,
  SUPPORTED_FILE_TYPES_STRING,
};
