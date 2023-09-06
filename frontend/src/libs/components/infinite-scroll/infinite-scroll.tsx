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
      next={fetchData}
      hasMore={hasMore}
      loader={'Loading'}
      dataLength={dataLength}
    >
      {children}
    </ReactInfiniteScroll>
  );
};

export { InfiniteScroll };
