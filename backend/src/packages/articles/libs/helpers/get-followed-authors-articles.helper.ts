import { type QueryBuilder } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/database.js';

import { type ArticleModel } from '../../article.model.js';

const getFollowedAuthorsArticles = (
  shouldShowFollowedAuthorsArticles: boolean,
  userId: number,
) => {
  return (builder: QueryBuilder<ArticleModel, ArticleModel[]>): void => {
    if (shouldShowFollowedAuthorsArticles) {
      void builder.whereExists((qb) => {
        void qb
          .select(1)
          .from(DatabaseTableName.USER_FOLLOWING_AUTHORS)
          .where({ userId })
          .whereRaw(`author_id=${DatabaseTableName.ARTICLES}.user_id`);
      });
    }
  };
};

export { getFollowedAuthorsArticles };
