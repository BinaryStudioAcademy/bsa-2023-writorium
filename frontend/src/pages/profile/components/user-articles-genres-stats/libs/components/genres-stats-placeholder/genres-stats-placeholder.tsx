import { Icon } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const GenresStatsPlaceholder: React.FC = () => (
  <section className={styles.genresStatsPlaceholder}>
    <Icon iconName="stats" className={styles.statsIcon} />
    <h3>
      Statistics of your article genres will be displayed here when you have
      articles
    </h3>
  </section>
);

export { GenresStatsPlaceholder };
