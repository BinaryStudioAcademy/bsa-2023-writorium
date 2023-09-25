import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getWhereTitleLikeQuery = (titleFilter?: string) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (titleFilter) {
      void builder.whereILike('articles.title', `%${titleFilter}%`);
    }
  };
};

export { getWhereTitleLikeQuery };
