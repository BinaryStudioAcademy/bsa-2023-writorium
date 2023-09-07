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
import { MOCKED_REACTIONS, MOCKED_TAGS } from './libs/constants.js';

const MyArticles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);
  const { hasMore, loadMore } = usePagination();

  const handleLoadArticles = useCallback(() => {
    void loadMore(async (skip: number, take: number) => {
      const data = await dispatch(
        articlesActions.fetchOwn({
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
      dataLength={articles.length}
      fetchData={handleLoadArticles}
    >
      {Boolean(articles.length) &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={article.author!}
            tags={MOCKED_TAGS}
            reactions={MOCKED_REACTIONS}
          />
        ))}
    </InfiniteScroll>
  );
};

export { MyArticles };
