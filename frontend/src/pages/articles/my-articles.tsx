import { InfiniteScroll } from '~/libs/components/components.js';
import { checkIsEqual, getArticleTags } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  usePagination,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';
import { actions as userActions } from '~/slices/users/users.js';

import { ArticleCard, ArticleFilters } from './components/components.js';
import {
  getActiveFilters,
  getSelectAuthorsOptions,
  getSelectGenresOptions,
} from './libs/helpers/helpers.js';
import { type FilterFormValues } from './libs/types/types.js';
import styles from './styles.module.scss';

const MyArticles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, genres } = useAppSelector(({ articles }) => articles);
  const { authors } = useAppSelector(({ users }) => users);

  const [filters, setFilters] = useState<FilterFormValues>({
    titleFilter: '',
    authorId: null,
    genreId: null,
    showFavourites: false,
  });

  const { hasMore, loadMore, resetSkip } = usePagination();

  const handleLoadArticles = useCallback(() => {
    void loadMore(async (skip: number, take: number) => {
      const data = await dispatch(
        articlesActions.fetchOwn({
          take,
          skip,
          ...getActiveFilters(filters),
        }),
      ).unwrap();

      return Boolean(data.items.length);
    });
  }, [dispatch, loadMore, filters]);

  const handleLoadGenres = useCallback(() => {
    void dispatch(articlesActions.getAllGenres());
  }, [dispatch]);

  const handleLoadAuthors = useCallback(() => {
    void dispatch(userActions.getAllAuthors());
  }, [dispatch]);

  const handleFiltersSubmit = useCallback(
    (payload: FilterFormValues): void => {
      if (!checkIsEqual(filters, payload)) {
        setFilters(payload);
        resetSkip();
        if (filters.showFavourites !== payload.showFavourites) {
          void dispatch(
            articlesActions.setShowFavourites(payload.showFavourites),
          );
        }
      }
    },
    [filters, resetSkip, dispatch],
  );

  useEffect(() => {
    handleLoadArticles();
    handleLoadAuthors();
    handleLoadGenres();

    return () => {
      dispatch(articlesActions.resetArticles());
    };
  }, [dispatch, handleLoadArticles, handleLoadAuthors, handleLoadGenres]);

  return (
    <div className={styles.articlesWrapper}>
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
      <ArticleFilters
        genreSelectOptions={getSelectGenresOptions(genres)}
        authorsSelectOptions={getSelectAuthorsOptions(authors)}
        onSubmit={handleFiltersSubmit}
      />
    </div>
  );
};

export { MyArticles };
