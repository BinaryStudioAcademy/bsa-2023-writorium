import { type QueryBuilder, raw } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/database.js';

import { type ArticleModel } from '../../article.model.js';

const getIsFavouriteSubQuery = (
  shouldShowFavourites: boolean,
  userId: number | null,
): ((builder: QueryBuilder<ArticleModel, ArticleModel[]>) => void) => {
  const query = shouldShowFavourites
    ? raw('true')
    : raw(
        `coalesce((SELECT true FROM ${DatabaseTableName.FAVOURED_USER_ARTICLES} fa WHERE fa.article_id=?? AND fa.user_id=??), false)`,
        `${DatabaseTableName.ARTICLES}.id`,
        userId,
      );

  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    void builder.select(query).as('isFavourite');
  };
};

export { getIsFavouriteSubQuery };
