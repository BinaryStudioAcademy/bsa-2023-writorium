import ReactInfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '../loader/loader.js';

type Properties = {
  children: React.ReactNode;
  hasMore: boolean;
  dataLength: number;
  isLoading: boolean;
  fetchData: () => void;
  className?: string;
};

const InfiniteScroll: React.FC<Properties> = ({
  fetchData,
  children,
  hasMore,
  dataLength,
  className,
  isLoading,
}) => (
  <ReactInfiniteScroll
    loader={<Loader isLoading={isLoading} type="circular" hasOverlay />}
    next={fetchData}
    hasMore={hasMore}
    dataLength={dataLength}
    className={className}
  >
    {children}
  </ReactInfiniteScroll>
);

export { InfiniteScroll };
