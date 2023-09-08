import { ActivityBreakpoints, ActivityThresholds } from '../../enums/enums.js';

const getActivityBreakpoint = (activityCount: number): string => {
  const { breakpoint1, breakpoint2, breakpoint3, breakpoint4 } =
    ActivityBreakpoints;
  const { threshold1, threshold2, threshold3 } = ActivityThresholds;
  const DEFAULT_RESULT = '';

  switch (true) {
    case activityCount === threshold1: {
      return breakpoint1;
    }
    case activityCount === threshold2: {
      return breakpoint2;
    }
    case activityCount > threshold2 && activityCount < threshold3: {
      return breakpoint3;
    }
    case activityCount >= threshold3: {
      return breakpoint4;
    }
    default: {
      return DEFAULT_RESULT;
    }
  }
};

export { getActivityBreakpoint };
