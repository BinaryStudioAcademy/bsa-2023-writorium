import {
  WindowBreakpoint,
  WindowBreakpointThreshold,
} from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

const getWindowBreakpoint = (
  breakpoint: ValueOf<typeof WindowBreakpoint>,
  width: number,
): boolean => {
  switch (breakpoint) {
    case WindowBreakpoint.MEDIUM: {
      return width <= WindowBreakpointThreshold.MEDIUM;
    }
    case WindowBreakpoint.LARGE: {
      return width <= WindowBreakpointThreshold.LARGE;
    }
    case WindowBreakpoint.EXTRA_LARGE: {
      return width <= WindowBreakpointThreshold.EXTRA_LARGE;
    }
    case WindowBreakpoint.EXTRA_EXTRA_LARGE: {
      return width >= WindowBreakpointThreshold.EXTRA_EXTRA_LARGE;
    }
    default: {
      return false;
    }
  }
};

export { getWindowBreakpoint };
