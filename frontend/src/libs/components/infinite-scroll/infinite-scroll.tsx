import ReactInfiniteScroll from 'react-infinite-scroll-component';

type Properties = {
  children: React.ReactNode;
  hasMore: boolean;
  dataLength: number;
  fetchData: () => void;
};

const InfiniteScroll: React.FC<Properties> = ({
  fetchData,
  children,
  hasMore,
  dataLength,
}) => {
  return (
    <ReactInfiniteScroll
      loader={null}
      next={fetchData}
      hasMore={hasMore}
      dataLength={dataLength}
    >
      {children}
    </ReactInfiniteScroll>
  );
};

export { InfiniteScroll };
