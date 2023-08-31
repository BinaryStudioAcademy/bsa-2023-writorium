import { type CommentEntityType } from './comment-entity.type.js';

type CommentCreateDto = Pick<
  CommentEntityType,
  'text' | 'userId' | 'articleId'
>;

export { type CommentCreateDto };
