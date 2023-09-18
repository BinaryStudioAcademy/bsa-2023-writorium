import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const getShowFavouritesQuery = (
  showFavourites: boolean,
  userId: number | null,
) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (showFavourites && userId) {
      void builder.whereExists((qb) => {
        void qb
          .select(1)
          .from('favoured_user_articles')
          .where({ userId })
          .whereRaw('article_id=articles.id');
      });
    }
  };
};

export { getShowFavouritesQuery };
