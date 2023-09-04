import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getWhereUserIdQuery = (userId?: number) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (userId) {
      void builder.where('articles.userId', userId);
    }
  };
};

export { getWhereUserIdQuery };
