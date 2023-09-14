import { type CommentEntityType } from './comment-entity.type.js';

type CommentUpdateDto = Pick<CommentEntityType, 'text' | 'id'>;

export { type CommentUpdateDto };
