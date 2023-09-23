import { type UserArticlesGenreStatsItem } from '~/packages/users/users.js';

import { GENRES_CHART_COLORS } from '../../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  genresStatistics: UserArticlesGenreStatsItem[];
};

const GenresList: React.FC<Properties> = ({ genresStatistics }) => (
  <ul className={styles.list}>
    {genresStatistics.map((data, index) => (
      <li
        key={data.key}
        className={styles.listItem}
        style={{
          color: GENRES_CHART_COLORS?.[index % GENRES_CHART_COLORS.length],
        }}
      >
        <span className={styles.itemName}>{data.name}</span>
      </li>
    ))}
  </ul>
);

export { GenresList };
