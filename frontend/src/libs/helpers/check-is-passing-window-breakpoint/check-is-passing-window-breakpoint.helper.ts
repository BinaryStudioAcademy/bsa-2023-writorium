import {
  WindowBreakpoint,
  WindowBreakpointThreshold,
} from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const checkIsPassingWindowBreakpoint = (
  breakpoint: ValueOf<typeof WindowBreakpoint>,
  width: number,
): boolean => {
  switch (breakpoint) {
    case WindowBreakpoint.SMALL: {
      return width < WindowBreakpointThreshold.MEDIUM;
    }
    case WindowBreakpoint.MEDIUM: {
      return width < WindowBreakpointThreshold.LARGE;
    }
    case WindowBreakpoint.LARGE: {
      return width < WindowBreakpointThreshold.EXTRA_LARGE;
    }
    case WindowBreakpoint.EXTRA_LARGE: {
      return width < WindowBreakpointThreshold.EXTRA_EXTRA_LARGE;
    }
    case WindowBreakpoint.EXTRA_EXTRA_LARGE: {
      return width >= WindowBreakpointThreshold.EXTRA_EXTRA_LARGE;
    }
    default: {
      return false;
    }
  }
};

export { checkIsPassingWindowBreakpoint };
