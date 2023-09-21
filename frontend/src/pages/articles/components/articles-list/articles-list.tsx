import { InfiniteScroll } from '~/libs/components/components.js';
import { getArticleTags } from '~/libs/helpers/helpers.js';
import { type ArticleWithCommentCountResponseDto } from '~/packages/articles/articles.js';

import { ArticleCard } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  hasMore: boolean;
  articlesLength: number;
  onFetchData: () => void;
  articles: ArticleWithCommentCountResponseDto[];
};

const ArticlesList: React.FC<Properties> = ({
  hasMore,
  articlesLength,
  onFetchData,
  articles,
}) => {
  return (
    <InfiniteScroll
      hasMore={hasMore}
      className={styles.articles}
      dataLength={articlesLength}
      fetchData={onFetchData}
    >
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          author={article.author}
          tags={getArticleTags(article)}
          reactions={article.reactions}
        />
      ))}
    </InfiniteScroll>
  );
};

export { ArticlesList };
