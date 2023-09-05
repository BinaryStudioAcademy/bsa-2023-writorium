import snakeCase from 'lodash.snakecase';

const convertToSnakeCase = (input: string): string => {
  return snakeCase(input);
};

export { convertToSnakeCase };
