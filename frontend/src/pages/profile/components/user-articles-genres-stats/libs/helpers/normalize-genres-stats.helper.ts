import { type UserArticlesGenresStatsItem } from '~/packages/users/users.js';

import {
  MAX_VISIBLE_GENRES,
  OTHER_GENRES_KEY,
  OTHER_GENRES_NAME,
} from '../constants/constants.js';

const normalizeGenresStats = (
  stats: UserArticlesGenresStatsItem[],
  maxGenres = MAX_VISIBLE_GENRES,
): UserArticlesGenresStatsItem[] => {
  const sortedData = [...stats].sort(
    (itemA, itemB) => itemB.count - itemA.count,
  );

  const mainGenres = sortedData.slice(0, maxGenres);
  const restGenres = sortedData.slice(maxGenres);
  const restGenresItem =
    stats.length > maxGenres
      ? [
          {
            key: OTHER_GENRES_KEY,
            name: OTHER_GENRES_NAME,
            count: restGenres.reduce((count, value) => count + value.count, 0),
          },
        ]
      : [];

  return [...mainGenres, ...restGenresItem];
};

export { normalizeGenresStats };
