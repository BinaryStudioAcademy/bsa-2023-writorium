const convertPlainStringToSnakeCase = (input: string): string => {
  return input
    .split(' ')
    .map((word) => word.replaceAll(/-+/g, '_').toLowerCase())
    .join('_');
};

export { convertPlainStringToSnakeCase };