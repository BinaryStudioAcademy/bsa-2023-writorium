import { format } from 'date-fns';

type FormatDateParameters = {
  isoString: string;
  pattern: string;
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: number;
    useAdditionalWeekYearTokens?: boolean;
    useAdditionalDayOfYearTokens?: boolean;
  };
};

const formatDate = ({
  isoString,
  pattern,
  options = undefined,
}: FormatDateParameters): string => {
  return format(new Date(isoString), pattern, options);
};

export { formatDate };
