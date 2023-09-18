import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString, getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ownArticlesPaginationConfig } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserLatestArticles: React.FC<Properties> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);

  useEffect(() => {
    void dispatch(
      articlesActions.fetchOwn({
        take: ownArticlesPaginationConfig.TAKE,
        skip: ownArticlesPaginationConfig.SKIP,
      }),
    );
    return () => {
      dispatch(articlesActions.resetArticles());
    };
  }, [dispatch]);

  return (
    <div className={getValidClassNames(className, styles.wrapper)}>
      <div>
        <h3 className={styles.listTitle}>Your latest articles</h3>
        <ol>
          {articles.map((article) => (
            <li key={article.id} className={styles.articleTitle}>
              <Link
                to={
                  configureString(AppRoute.ARTICLES_$ID, {
                    id: String(article.id),
                  }) as typeof AppRoute.ARTICLES_$ID
                }
                className={styles.articleLink}
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <Link to={AppRoute.ARTICLES_MY_ARTICLES} className={styles.showAll}>
        Show all
      </Link>
    </div>
  );
};

export { UserLatestArticles };
