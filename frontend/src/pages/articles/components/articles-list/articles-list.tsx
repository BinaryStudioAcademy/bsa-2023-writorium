import { InfiniteScroll } from '~/libs/components/components.js';
import { getArticleTags } from '~/libs/helpers/helpers.js';
import { type ArticleWithCountsResponseDto } from '~/packages/articles/articles.js';

import { ArticleCard } from '../article-card/article-card.js';
import styles from './styles.module.scss';

type Properties = {
  hasMore: boolean;
  articlesLength: number;
  onFetchData: () => void;
  articles: ArticleWithCountsResponseDto[];
};

const ArticlesList: React.FC<Properties> = ({
  hasMore,
  articlesLength,
  onFetchData,
  articles,
}) => (
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

export { ArticlesList };
