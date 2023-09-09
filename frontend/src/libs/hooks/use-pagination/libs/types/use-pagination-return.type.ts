type UsePaginationReturn = {
  hasMore: boolean;
  loadMore: (
    callback: (skip: number, take: number) => Promise<boolean>,
  ) => Promise<void>;
};

export { type UsePaginationReturn };
