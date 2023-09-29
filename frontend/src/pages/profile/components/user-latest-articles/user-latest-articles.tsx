import { Link, Loader } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { EmptyArticlesPlaceholder } from '~/pages/articles/components/components.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleShortCard } from '../article-short-card/article-short-card.js';
import { OwnArticlesPaginationConfig } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  className?: string;
};

const UserLatestArticles: React.FC<Properties> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { articles, fetchArticlesDataStatus } = useAppSelector(
    ({ articles }) => ({
      articles: articles.articles,
      fetchArticlesDataStatus: articles.fetchArticlesDataStatus,
    }),
  );

  const hasArticles = Boolean(articles.length);

  useEffect(() => {
    void dispatch(
      articlesActions.fetchOwn({
        take: OwnArticlesPaginationConfig.TAKE,
        skip: OwnArticlesPaginationConfig.SKIP,
      }),
    );
    return () => {
      dispatch(articlesActions.resetArticles());
    };
  }, [dispatch]);

  const isLoading = fetchArticlesDataStatus === DataStatus.PENDING;

  return (
    <div className={styles.latestArticlesContainer}>
      <h3 className={styles.listTitle}>Your latest articles</h3>
      <div className={getValidClassNames(className, styles.wrapper)}>
        <Loader isLoading={isLoading} type="dots">
          {hasArticles ? (
            <>
              <ul className={styles.articleList}>
                {articles.map((article) => (
                  <li key={article.id}>
                    <ArticleShortCard
                      article={article}
                      className={styles.article}
                    />
                  </li>
                ))}
              </ul>
              <Link
                to={AppRoute.ARTICLES_MY_ARTICLES}
                className={styles.showAll}
              >
                Show all
              </Link>
            </>
          ) : (
            <EmptyArticlesPlaceholder />
          )}
        </Loader>
      </div>
    </div>
  );
};

export { UserLatestArticles };
