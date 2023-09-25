import { type CommentEntityInstance } from '~/packages/comments/libs/types/comment-entity-instance.type.js';

type CommentBaseResponseDto = Pick<
  CommentEntityInstance,
  'id' | 'text' | 'userId' | 'articleId' | 'createdAt'
>;

export { type CommentBaseResponseDto };
