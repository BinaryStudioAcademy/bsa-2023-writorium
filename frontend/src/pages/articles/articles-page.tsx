import { Layout, Link, RouterOutlet } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

const ArticlesPage: React.FC = () => (
  <Layout className={styles.layout}>
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
          to={AppRoute.ARTICLES_MY_ARTICLES}
          className={styles.tab}
          activeClassName={styles.activeTab}
        >
          My articles
        </Link>
      </div>
      <RouterOutlet />
    </div>
  </Layout>
);

export { ArticlesPage };
