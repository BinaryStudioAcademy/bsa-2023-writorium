import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getWhereGenreIdQuery = (genreId?: number | null) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (genreId) {
      void builder.where('articles.genreId', genreId);
    }
  };
};

export { getWhereGenreIdQuery };
