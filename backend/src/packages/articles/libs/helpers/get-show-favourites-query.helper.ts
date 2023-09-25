import { type QueryBuilder } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/database.js';

import { type ArticleModel } from '../../article.model.js';

const getShowFavouritesQuery = (
  shouldShowFavourites: boolean,
  userId: number | null,
) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (shouldShowFavourites && userId) {
      void builder.whereExists((qb) => {
        void qb
          .select(1)
          .from(DatabaseTableName.FAVOURED_USER_ARTICLES)
          .where({ userId })
          .whereRaw(`article_id=${DatabaseTableName.ARTICLES}.id`);
      });
    }
  };
};

export { getShowFavouritesQuery };
