import {
  IconButton,
  Modal,
  ScrollToTop,
} from '~/libs/components/components.js';
import { WindowBreakpoint } from '~/libs/enums/enums.js';
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
  const { articles, genres } = useAppSelector(({ articles }) => articles);
  const { authors } = useAppSelector(({ users }) => users);

  const { width } = useGetWindowDimensions();
  const shouldHideFilters = checkIsPassingWindowBreakpoint(
    WindowBreakpoint.LARGE,
    width,
  );

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
        {articles.length ? (
          <ArticlesList
            hasMore={hasMore}
            articlesLength={articles.length}
            onFetchData={handleLoadArticles}
            articles={articles}
          />
        ) : (
          <EmptyArticlesPlaceholder />
        )}

        {shouldHideFilters ? (
          <IconButton
            iconName="filter"
            className={styles.filterButton}
            onClick={handleToggleModalOpen}
          />
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
          />
        </Modal>
      </div>
      <ScrollToTop />
    </>
  );
};

export { MyArticles };
