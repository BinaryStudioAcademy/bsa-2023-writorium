import { type UserArticlesGenresStatsItem } from './types.js';

type GetUserArticlesGenresStatsDatabaseResponse = Omit<
  UserArticlesGenresStatsItem,
  'count'
> & { count: string };

export { type GetUserArticlesGenresStatsDatabaseResponse };
