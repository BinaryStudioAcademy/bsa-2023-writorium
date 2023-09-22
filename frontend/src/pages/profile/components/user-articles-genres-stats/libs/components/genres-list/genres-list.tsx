import { type UserArticlesGenreStatsItem } from '~/packages/users/users.js';

import { GENRES_CHART_COLORS } from '../../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  chartData: UserArticlesGenreStatsItem[];
};

const GenresList: React.FC<Properties> = ({ chartData }) => (
  <ul className={styles.list}>
    {chartData.map((data, index) => (
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
