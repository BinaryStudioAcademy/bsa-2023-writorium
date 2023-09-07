import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getWherePublishedOnlyQuery = (hasToPublishedOnly?: boolean) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (hasToPublishedOnly) {
      void builder.whereNotNull('publishedAt');
    }
  };
};

export { getWherePublishedOnlyQuery };
