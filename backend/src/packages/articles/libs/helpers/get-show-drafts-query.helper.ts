import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { ArticleSortingKey } from '../enums/enums.js';

const getShowDraftsQuery = (shouldShowDrafts: boolean, userId: number) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (shouldShowDrafts) {
      void builder.where({ userId }).whereNull(ArticleSortingKey.PUBLISHED);
    }
  };
};

export { getShowDraftsQuery };
