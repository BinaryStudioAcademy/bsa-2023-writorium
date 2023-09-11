import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';

const joinArticleRelations = <T>(
  queryBuilder: QueryBuilder<ArticleModel, T>,
  relations: string,
): void => {
  void queryBuilder
    .withGraphJoined(relations)
    .modifyGraph('reactions', (builder) => {
      void builder.select('id', 'isLike', 'userId');
    });
};

export { joinArticleRelations };
