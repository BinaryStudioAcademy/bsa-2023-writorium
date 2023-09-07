import { SUPPORTED_FILE_TYPES } from '~/libs/constants/constants.js';

const SUPPORTED_FILE_TYPES_STRING = SUPPORTED_FILE_TYPES.join(', ');

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
  SUPPORTED_FILE_TYPES_STRING,
};
