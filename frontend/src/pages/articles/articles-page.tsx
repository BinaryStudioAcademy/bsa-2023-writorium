import { Link, RouterOutlet } from '~/libs/components/components.js';
import { ArticleSubRoute } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

const ArticlesPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabsWrapper}>
        <Link
          to={ArticleSubRoute.FEED}
          className={styles.tab}
          activeClassName={styles.activeTab}
        >
          Feed
        </Link>
        <Link
          to={ArticleSubRoute.MY_ARTICLES}
          className={styles.tab}
          activeClassName={styles.activeTab}
        >
          My articles
        </Link>
      </div>
      <div className={styles.articles}>{<RouterOutlet />}</div>
    </div>
  );
};

export { ArticlesPage };