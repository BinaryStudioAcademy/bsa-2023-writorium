import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { ArticleColumn } from '../enums/enums.js';

const getWhereTitleLikeQuery = (titleFilter?: string) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (titleFilter) {
      void builder.whereILike(ArticleColumn.TITLE, `%${titleFilter}%`);
    }
  };
};

export { getWhereTitleLikeQuery };
