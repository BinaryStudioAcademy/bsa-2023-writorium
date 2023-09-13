import { InfiniteScroll } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  usePagination,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCard } from './components/components.js';
import { getArticleTags } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const ArticlesFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);
  const { hasMore, loadMore } = usePagination();

  const handleLoadArticles = useCallback(() => {
    void loadMore(async (skip: number, take: number) => {
      const data = await dispatch(
        articlesActions.fetchAll({
          take,
          skip,
        }),
      ).unwrap();

      return Boolean(data.items.length);
    });
  }, [dispatch, loadMore]);

  useEffect(() => {
    handleLoadArticles();

    return () => {
      dispatch(articlesActions.resetArticles());
    };
  }, [dispatch, handleLoadArticles]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      className={styles.articles}
      dataLength={articles.length}
      fetchData={handleLoadArticles}
    >
      {Boolean(articles.length) &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={article.author}
            tags={getArticleTags(article)}
            reactions={article.reactions}
          />
        ))}
    </InfiniteScroll>
  );
};

export { ArticlesFeed };
