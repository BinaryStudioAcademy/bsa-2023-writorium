import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { ArticleColumn } from '../enums/enums.js';

const getWhereUserIdQuery = (userId?: number) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (userId) {
      void builder.where(ArticleColumn.USER_ID, userId);
    }
  };
};

export { getWhereUserIdQuery };
