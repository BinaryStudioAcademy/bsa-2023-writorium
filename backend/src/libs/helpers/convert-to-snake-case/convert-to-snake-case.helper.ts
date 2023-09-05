import snakeCase from 'lodash.snakecase';

const convertToSnakeCase = (input: string): string => snakeCase(input);

export { convertToSnakeCase };
