import { type QueryBuilder, raw } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/database.js';

import { type ArticleModel } from '../../article.model.js';

const getIsFavouriteSubQuery = (
  showFavourites: boolean,
  userId: number | null,
): ((builder: QueryBuilder<ArticleModel, ArticleModel[]>) => void) => {
  const query = showFavourites
    ? raw('true')
    : raw(
        'coalesce((SELECT true FROM favoured_user_articles fa WHERE fa.article_id=?? AND fa.user_id=??), false)',
        `${DatabaseTableName.ARTICLES}.id`,
        userId,
      );

  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    void builder.select(query).as('isFavourite');
  };
};

export { getIsFavouriteSubQuery };
