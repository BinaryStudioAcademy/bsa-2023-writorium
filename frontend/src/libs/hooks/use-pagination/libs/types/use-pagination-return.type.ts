type UsePaginationReturn = {
  hasMore: boolean;
  load: (
    callback: (skip: number, take: number) => Promise<boolean>,
  ) => Promise<void>;
};

export { type UsePaginationReturn };
