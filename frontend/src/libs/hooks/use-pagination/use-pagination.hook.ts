import { useCallback, useRef, useState } from 'react';

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
  const paginationParameters = useRef({ skip: defaultSkip, take: defaultTake });

  const load = useCallback(
    async (
      callback: (skip: number, take: number) => Promise<boolean>,
    ): Promise<void> => {
      const { skip, take } = paginationParameters.current;

      const hasMore = await callback(skip, take);
      setHasMore(hasMore);

      if (hasMore) {
        paginationParameters.current.skip += take;
      }
    },
    [],
  );

  return { hasMore, load };
};

export { usePagination };
