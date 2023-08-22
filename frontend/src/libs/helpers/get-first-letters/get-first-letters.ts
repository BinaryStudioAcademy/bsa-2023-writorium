const getFirstLetters = (initialString: string): string =>
  initialString
    .split(' ')
    .map((word) => word.slice(0, 1).toUpperCase())
    .join('');

export { getFirstLetters };
