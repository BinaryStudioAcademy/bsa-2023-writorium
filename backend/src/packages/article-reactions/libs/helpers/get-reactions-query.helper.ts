import { type QueryBuilder } from 'objection';

import { type ArticleReactionModel } from '../../article-reaction.model.js';

const getReactionsQuery =
  (model: typeof ArticleReactionModel) =>
  (isLike: boolean): QueryBuilder<ArticleReactionModel> => {
    const col = isLike ? 'likeCount' : 'dislikeCount';

    return model.query().count().where({ isLike }).as(col);
  };

export { getReactionsQuery };
