import { ActivityBreakpoint, ActivityThreshold } from '../../enums/enums.js';

const getActivityBreakpoint = (activityCount: number): string => {
  const DEFAULT_RESULT = '';

  const activityBreakpointToCssClass = {
    [ActivityBreakpoint.FIRST]: 'firstBreakpoint',
    [ActivityBreakpoint.SECOND]: 'secondBreakpoint',
    [ActivityBreakpoint.THIRD]: 'thirdBreakpoint',
    [ActivityBreakpoint.FOURTH]: 'fourthBreakpoint',
  };

  switch (true) {
    case activityCount === ActivityThreshold.FIRST: {
      return activityBreakpointToCssClass[ActivityBreakpoint.FIRST];
    }
    case activityCount === ActivityThreshold.SECOND: {
      return activityBreakpointToCssClass[ActivityBreakpoint.SECOND];
    }
    case activityCount > ActivityThreshold.SECOND &&
      activityCount < ActivityThreshold.THIRD: {
      return activityBreakpointToCssClass[ActivityBreakpoint.THIRD];
    }
    case activityCount >= ActivityThreshold.THIRD: {
      return activityBreakpointToCssClass[ActivityBreakpoint.FOURTH];
    }
    default: {
      return DEFAULT_RESULT;
    }
  }
};

export { getActivityBreakpoint };
