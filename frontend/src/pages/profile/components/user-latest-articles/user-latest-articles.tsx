import { Link } from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
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
      <ol>
        {articles.map((article) => (
          <li key={article.id} className={styles.articleTitle}>
            <Link
              to={
                AppRoute.ARTICLE.replace(
                  ':id',
                  article.id.toString(),
                ) as typeof AppRoute.ARTICLE
              }
              className={styles.articleLink}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ol>
      <Link
        to={
          `${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}` as typeof AppRoute.ARTICLE
        }
        className={styles.showAll}
      >
        Show all
      </Link>
    </div>
  );
};

export { UserLatestArticles };
