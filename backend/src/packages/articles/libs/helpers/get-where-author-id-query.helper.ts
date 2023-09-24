import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { ArticleColumn } from '../enums/enums.js';

const getWhereAuthorIdQuery = (authorId?: number | null) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (authorId) {
      void builder.where(ArticleColumn.USER_ID, authorId);
    }
  };
};

export { getWhereAuthorIdQuery };
