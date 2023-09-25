import { type CommentEntityInstance } from './comment-entity-instance.type.js';

type CommentCreateDto = Pick<
  CommentEntityInstance,
  'text' | 'userId' | 'articleId'
>;

export { type CommentCreateDto };
