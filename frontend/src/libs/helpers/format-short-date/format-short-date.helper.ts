const formatShortDate = (date: string): string => {
  return new Date(date).toString().split(' ').slice(1, 3).join(' ');
};

export { formatShortDate };
