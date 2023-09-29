import {
  IconButton,
  Modal,
  ScrollToTop,
} from '~/libs/components/components.js';
import { DataStatus, WindowBreakpoint } from '~/libs/enums/enums.js';
import {
  checkIsEqual,
  checkIsPassingWindowBreakpoint,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useGetWindowDimensions,
  useModal,
  usePagination,
  useState,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';
import { actions as userActions } from '~/slices/users/users.js';

import {
  ArticleFilters,
  ArticlesList,
  EmptyArticlesPlaceholder,
} from './components/components.js';
import {
  getActiveFilters,
  getSelectAuthorsOptions,
  getSelectGenresOptions,
} from './libs/helpers/helpers.js';
import { type FilterFormValues } from './libs/types/types.js';
import styles from './styles.module.scss';

const MyArticles: React.FC = () => {
  const { handleToggleModalOpen, isOpen } = useModal();
  const dispatch = useAppDispatch();
  const { articles, articlesStatus, authors, genres } = useAppSelector(
    ({ articles, users }) => ({
      articles: articles.articles,
      articlesStatus: articles.fetchArticlesDataStatus,
      genres: articles.genres,
      authors: users.authors,
    }),
  );

  const { width } = useGetWindowDimensions();
  const shouldHideFilters = checkIsPassingWindowBreakpoint(
    WindowBreakpoint.LARGE,
    width,
  );

  const [filters, setFilters] = useState<FilterFormValues>({
    titleFilter: '',
    authorId: null,
    genreId: null,
    shouldShowFavourites: false,
    shouldShowFollowedAuthorsArticles: false,
    shouldShowPublishedAricles: false,
    shouldShowDrafts: false,
  });

  const isLoadingArticles = articlesStatus === DataStatus.PENDING;
  const isFilterSelected = Object.entries(getActiveFilters(filters)).length > 0;
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

      return Boolean(data.items.length >= take);
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
        if (filters.shouldShowFavourites !== payload.shouldShowFavourites) {
          void dispatch(
            articlesActions.setShowFavourites(payload.shouldShowFavourites),
          );
        }
      }
    },
    [filters, resetSkip, dispatch],
  );

  const handleModalClose = useCallback(() => {
    if (isOpen) {
      handleToggleModalOpen();
    }
    return false;
  }, [handleToggleModalOpen, isOpen]);

  useEffect(() => {
    handleLoadArticles();
    handleLoadAuthors();
    handleLoadGenres();

    return () => {
      dispatch(articlesActions.resetArticles());
    };
  }, [dispatch, handleLoadArticles, handleLoadAuthors, handleLoadGenres]);

  return (
    <>
      <div className={styles.articlesWrapper}>
        {Boolean(articles.length) || isLoadingArticles ? (
          <ArticlesList
            hasMore={hasMore}
            articlesLength={articles.length}
            articles={articles}
            isLoading={isLoadingArticles}
            onFetchData={handleLoadArticles}
          />
        ) : (
          <EmptyArticlesPlaceholder
            shouldShowFilterMessage={isFilterSelected}
          />
        )}
        {shouldHideFilters ? (
          <div className={styles.filterButtonWrapper}>
            <IconButton
              iconName="filter"
              className={styles.filterButton}
              onClick={handleToggleModalOpen}
            />
          </div>
        ) : (
          <ArticleFilters
            genreSelectOptions={getSelectGenresOptions(genres)}
            authorsSelectOptions={getSelectAuthorsOptions(authors)}
            onSubmit={handleFiltersSubmit}
          />
        )}
        <Modal
          contentClassName={styles.modalContent}
          isOpen={shouldHideFilters ? isOpen : handleModalClose()}
          onClose={handleToggleModalOpen}
        >
          <ArticleFilters
            genreSelectOptions={getSelectGenresOptions(genres)}
            authorsSelectOptions={getSelectAuthorsOptions(authors)}
            onSubmit={handleFiltersSubmit}
            currentFilters={filters}
          />
        </Modal>
      </div>
      <ScrollToTop />
    </>
  );
};

export { MyArticles };
