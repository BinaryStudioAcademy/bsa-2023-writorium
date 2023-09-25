import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getWhereAuthorIdQuery = (authorId?: number | null) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (authorId) {
      void builder.where('articles.userId', authorId);
    }
  };
};

export { getWhereAuthorIdQuery };
