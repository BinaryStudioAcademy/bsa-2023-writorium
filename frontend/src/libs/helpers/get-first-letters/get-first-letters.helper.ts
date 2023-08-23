const getFirstLetters = (initialString: string): string => {
  return initialString
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');
};

export { getFirstLetters };
