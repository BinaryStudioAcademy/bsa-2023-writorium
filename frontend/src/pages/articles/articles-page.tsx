import { Layout, Link, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

const ArticlesPage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.tabsWrapper}>
          <Link
            to={AppRoute.ARTICLES}
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
    </Layout>
  );
};

export { ArticlesPage };
