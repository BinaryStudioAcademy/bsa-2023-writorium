import { InfiniteScroll, Loader } from '~/libs/components/components.js';
import { getArticleTags } from '~/libs/helpers/helpers.js';
import { type ArticleWithCountsResponseDto } from '~/packages/articles/articles.js';

import { ArticleCard } from '../article-card/article-card.js';
import { EmptyArticlesPlaceholder } from '../components.js';
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
}) => {
  if (!isLoading && !articles.length) {
    return <EmptyArticlesPlaceholder />;
  }

  return (
    <Loader isLoading={isLoading && !articles.length} type="circular">
      <InfiniteScroll
        hasMore={hasMore}
        className={styles.articles}
        dataLength={articlesLength}
        isLoading={isLoading}
        onFetchData={onFetchData}
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
    </Loader>
  );
};

export { ArticlesList };
