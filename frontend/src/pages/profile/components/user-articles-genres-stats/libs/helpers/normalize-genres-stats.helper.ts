import { type UserArticlesGenresStatsItem } from '~/packages/users/users.js';

import { MAX_VISIBLE_GENRES } from '../constants/constants.js';

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
            key: 'others',
            name: 'Others',
            count: restGenres.reduce((count, value) => count + value.count, 0),
          },
        ]
      : [];

  return [...mainGenres, ...restGenresItem];
};

export { normalizeGenresStats };
