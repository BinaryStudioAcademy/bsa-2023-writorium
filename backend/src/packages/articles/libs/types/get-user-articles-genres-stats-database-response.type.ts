import { type UserArticlesGenreStatsItem } from './types.js';

type GetUserArticlesGenresStatsDatabaseResponse = Omit<
  UserArticlesGenreStatsItem,
  'count'
> & { count: string };

export { type GetUserArticlesGenresStatsDatabaseResponse };
