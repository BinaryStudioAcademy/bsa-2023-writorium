import { InfiniteScroll } from '~/libs/components/components.js';
import { getArticleTags } from '~/libs/helpers/helpers.js';
import { type ArticleWithCountsResponseDto } from '~/packages/articles/articles.js';

import { ArticleCard } from '../article-card/article-card.js';
import styles from './styles.module.scss';

type Properties = {
  hasMore: boolean;
  articlesLength: number;
  articles: ArticleWithCountsResponseDto[];
  isLoading: boolean;
  onFetchData: () => void;
};

const ArticlesList: React.FC<Properties> = ({
  hasMore,
  articlesLength,
  articles,
  isLoading,
  onFetchData,
}) => (
  <InfiniteScroll
    hasMore={hasMore}
    className={styles.articles}
    dataLength={articlesLength}
    isLoading={isLoading}
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

export { ArticlesList };
