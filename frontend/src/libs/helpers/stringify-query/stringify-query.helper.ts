import queryString from 'query-string';

const stringifyQuery = (query: Record<string, unknown>): string => {
  return queryString.stringify(query);
};

export { stringifyQuery };
