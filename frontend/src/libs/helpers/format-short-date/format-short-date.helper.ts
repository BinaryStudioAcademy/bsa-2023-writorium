const formatShortDate = (date: string): string => {
  return new Date(date).toString().split(' ').slice(1, 3).join(' ');
};

// To replace it with date-fns package usage

export { formatShortDate };
