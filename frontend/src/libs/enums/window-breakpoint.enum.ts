const WindowBreakpoint = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extra-large',
  EXTRA_EXTRA_LARGE: 'extra-extra-large',
} as const;

const WindowBreakpointThreshold = {
  SMALL: 576,
  MEDIUM: 768,
  LARGE: 992,
  EXTRA_LARGE: 1200,
  EXTRA_EXTRA_LARGE: 1920,
} as const;

export { WindowBreakpoint, WindowBreakpointThreshold };
