import { type ClassValue, clsx } from 'clsx';

const getValidClassNames: typeof clsx = (...inputs: ClassValue[]): string => {
  return clsx(...inputs);
};

export { getValidClassNames };
