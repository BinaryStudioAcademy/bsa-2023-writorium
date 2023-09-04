import { type CommentEntityType } from '~/packages/comments/libs/types/comment-entity.type.js';

type CommentBaseResponseDto = Pick<
  CommentEntityType,
  'id' | 'text' | 'userId' | 'articleId' | 'createdAt'
>;

export { type CommentBaseResponseDto };
