import ReactInfiniteScroll from 'react-infinite-scroll-component';

type Properties = {
  children: React.ReactNode;
  hasMore: boolean;
  dataLength: number;
  fetchData: () => void;
  className?: string;
};

const InfiniteScroll: React.FC<Properties> = ({
  fetchData,
  children,
  hasMore,
  dataLength,
  className,
}) => (
  <ReactInfiniteScroll
    loader={null}
    next={fetchData}
    hasMore={hasMore}
    dataLength={dataLength}
    className={className}
  >
    {children}
  </ReactInfiniteScroll>
);

export { InfiniteScroll };
