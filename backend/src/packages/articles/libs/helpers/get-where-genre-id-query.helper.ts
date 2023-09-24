import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { ArticleColumn } from '../enums/enums.js';

const getWhereGenreIdQuery = (genreId?: number | null) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (genreId) {
      void builder.where(ArticleColumn.GENRE_ID, genreId);
    }
  };
};

export { getWhereGenreIdQuery };
