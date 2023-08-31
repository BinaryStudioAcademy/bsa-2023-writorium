import { type CommentEntityType } from './comment-entity.type.js';

type CommentUpdateDto = Pick<
  CommentEntityType,
  'text' | 'userId'
>;

export { type CommentUpdateDto };
