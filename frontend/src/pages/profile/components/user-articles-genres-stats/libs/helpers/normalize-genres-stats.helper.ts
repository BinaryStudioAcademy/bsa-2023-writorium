import { ZERO_COUNT } from '~/libs/constants/constants.js';
import { type UserArticlesGenreStatsItem } from '~/packages/users/users.js';

import { OtherGenre } from '../enums/enums.js';

const normalizeGenresStats = (
  stats: UserArticlesGenreStatsItem[],
  maxGenres: number,
): UserArticlesGenreStatsItem[] => {
  const sortedData = [...stats].sort(
    (itemA, itemB) => itemB.count - itemA.count,
  );

  const mainGenres = sortedData.slice(ZERO_COUNT, maxGenres);
  const restGenres = sortedData.slice(maxGenres);
  const restGenresItem =
    stats.length > maxGenres
      ? [
          {
            key: OtherGenre.KEY,
            name: OtherGenre.NAME,
            count: restGenres.reduce(
              (count, value) => count + value.count,
              ZERO_COUNT,
            ),
          },
        ]
      : [];

  return [...mainGenres, ...restGenresItem];
};

export { normalizeGenresStats };
