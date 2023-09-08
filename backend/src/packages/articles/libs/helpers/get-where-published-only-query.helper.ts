import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getWherePublishedOnlyQuery = (hasPublishedOnly?: boolean) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (hasPublishedOnly) {
      void builder.whereNotNull('publishedAt');
    }
  };
};

export { getWherePublishedOnlyQuery };
