import { type CommentEntityInstance } from './comment-entity-instance.type.js';

type CommentUpdateDto = Pick<CommentEntityInstance, 'text' | 'id'>;

export { type CommentUpdateDto };
