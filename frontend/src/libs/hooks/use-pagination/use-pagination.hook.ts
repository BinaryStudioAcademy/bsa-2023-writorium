import { useCallback, useReference, useState } from '../react/react.js';
import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from './libs/constants/constants.js';
import {
  type UsePaginationProperties,
  type UsePaginationReturn,
} from './libs/types/types.js';

const usePagination = ({
  defaultSkip = DEFAULT_PAGINATION_SKIP,
  defaultTake = DEFAULT_PAGINATION_TAKE,
}: UsePaginationProperties = {}): UsePaginationReturn => {
  const [hasMore, setHasMore] = useState(false);
  const paginationParameters = useReference({
    skip: defaultSkip,
    take: defaultTake,
  });
  const resetSkip = (): void => {
    paginationParameters.current.skip = 0;
  };

  const loadMore = useCallback(
    async (
      callback: (skip: number, take: number) => Promise<boolean>,
    ): Promise<void> => {
      const { skip, take } = paginationParameters.current;

      const hasMore = await callback(skip, take);
      setHasMore(hasMore);

      if (hasMore) {
        paginationParameters.current.skip = skip + take;
      }
    },
    [],
  );

  return { hasMore, loadMore, resetSkip };
};

export { usePagination };
