import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { ArticlePublishStatus } from '../enums/enums.js';
import { type ArticleGenreStatsFilters } from '../types/types.js';

const getArticlePublishedStatusQuery = (
  articleStatus: ArticleGenreStatsFilters['articlePublishedStatus'],
): ((builder: QueryBuilder<ArticleModel, ArticleModel[]>) => void) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (articleStatus) {
      articleStatus === ArticlePublishStatus.DRAFT
        ? void builder.whereNull('articles.publishedAt')
        : void builder.whereNotNull('articles.publishedAt');
    }
  };
};

export { getArticlePublishedStatusQuery };
