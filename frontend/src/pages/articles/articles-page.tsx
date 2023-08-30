import { Link, RouterOutlet } from '~/libs/components/components.js';
import { ArticleSubRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useLocation } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const ArticlesPage: React.FC = () => {
  const { pathname } = useLocation();
  const activePage = pathname.split('/').pop();

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabsWrapper}>
        <Link
          to={ArticleSubRoute.FEED}
          className={getValidClassNames(
            styles.tab,
            activePage === ArticleSubRoute.FEED && styles.activeTab,
          )}
        >
          Feed
        </Link>
        <Link
          to={ArticleSubRoute.MY_ARTICLES}
          className={getValidClassNames(
            styles.tab,
            activePage === ArticleSubRoute.MY_ARTICLES && styles.activeTab,
          )}
        >
          My articles
        </Link>
      </div>
      <div className={styles.articles}>{<RouterOutlet />}</div>
    </div>
  );
};

export { ArticlesPage };
