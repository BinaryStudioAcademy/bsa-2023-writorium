import { FIRST_ELEMENT_ARRAY_INDEX } from '~/libs/constants/constants.js';
import { type UserArticlesGenreStatsItem } from '~/packages/users/users.js';

import { OtherGenre } from '../enums/enums.js';

const normalizeGenresStats = (
  stats: UserArticlesGenreStatsItem[],
  maxGenres: number,
): UserArticlesGenreStatsItem[] => {
  const sortedData = [...stats].sort(
    (itemA, itemB) => itemB.count - itemA.count,
  );

  const mainGenres = sortedData.slice(FIRST_ELEMENT_ARRAY_INDEX, maxGenres);
  const restGenres = sortedData.slice(maxGenres);
  const restGenresItem =
    stats.length > maxGenres
      ? [
          {
            key: OtherGenre.KEY,
            name: OtherGenre.NAME,
            count: restGenres.reduce((count, value) => count + value.count, 0),
          },
        ]
      : [];

  return [...mainGenres, ...restGenresItem];
};

export { normalizeGenresStats };
