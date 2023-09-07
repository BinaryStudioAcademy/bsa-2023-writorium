import { ACTIVITY_BREAKPOINTS } from '../../constants/constants.js';

const getActivityBreakpoint = (activityCount: number): string => {
  let activityBreakpoint = '';
  const { breakpoint1, breakpoint2, breakpoint3, breakpoint4 } =
    ACTIVITY_BREAKPOINTS;

  switch (true) {
    case activityCount === 0: {
      activityBreakpoint = breakpoint1;
      break;
    }
    case activityCount === 1: {
      activityBreakpoint = breakpoint2;
      break;
    }
    case activityCount > 1 && activityCount < 5: {
      activityBreakpoint = breakpoint3;
      break;
    }
    case activityCount >= 5: {
      activityBreakpoint = breakpoint4;
      break;
    }
  }

  return activityBreakpoint;
};

export { getActivityBreakpoint };
