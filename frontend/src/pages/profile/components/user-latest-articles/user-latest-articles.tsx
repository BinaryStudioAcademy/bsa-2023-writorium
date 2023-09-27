import { Link } from '~/libs/components/components.js';
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
  const { articles, articlesStatus } = useAppSelector(({ articles }) => ({
    articles: articles.articles,
    articlesStatus: articles.dataStatus,
  }));

  const isLoadingArticles = articlesStatus === DataStatus.PENDING;
  const isArticles = Boolean(articles.length) || isLoadingArticles;

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

  return (
    <div className={styles.latestArticlesContainer}>
      <h3 className={styles.listTitle}>
        {isArticles ? 'Your latest articles' : 'My articles'}
      </h3>
      <div className={getValidClassNames(className, styles.wrapper)}>
        {isArticles ? (
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
            <Link to={AppRoute.ARTICLES_MY_ARTICLES} className={styles.showAll}>
              Show all
            </Link>
          </>
        ) : (
          <EmptyArticlesPlaceholder />
        )}
      </div>
    </div>
  );
};

export { UserLatestArticles };
