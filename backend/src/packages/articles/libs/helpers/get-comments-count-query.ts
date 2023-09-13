import { type QueryBuilder } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/database.js';
import { type ArticleModel } from '~/packages/articles/articles.js';
import { type CommentModel } from '~/packages/comments/comment.model.js';

const getCommentsCountQuery = (
  model: typeof ArticleModel,
): QueryBuilder<CommentModel> => {
  return model
    .relatedQuery<CommentModel>(DatabaseTableName.COMMENTS)
    .count()
    .as('commentCount');
};

export { getCommentsCountQuery };
