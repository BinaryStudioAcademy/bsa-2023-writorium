import { type QueryBuilder } from 'objection';

import { type ArticleReactionModel } from '../../article-reaction.model.js';
import { type ArticleReactionCreateResponseDto } from '../types/types.js';

const getReactionsQuery = (model: typeof ArticleReactionModel) => {
  return (isLike: boolean): QueryBuilder<ArticleReactionModel> => {
    const col: keyof ArticleReactionCreateResponseDto = isLike
      ? 'likeCount'
      : 'dislikeCount';

    return model.query().count().where({ isLike }).as(col);
  };
};

export { getReactionsQuery };
