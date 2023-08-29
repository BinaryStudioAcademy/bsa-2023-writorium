import { type CommentEntityType } from './comment-entity.type.js';

type CommentCreateDto = Pick<
  CommentEntityType,
  'text' | 'userId' | 'articleId' | 'publishedAt'

>;

export { type CommentCreateDto };
