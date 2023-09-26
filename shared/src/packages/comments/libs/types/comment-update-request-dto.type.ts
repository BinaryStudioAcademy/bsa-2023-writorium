import { type CommentEntityInstance } from '~/packages/comments/libs/types/comment-entity-instance.type.js';

type CommentUpdateRequestDto = Pick<CommentEntityInstance, 'text'>;

export { type CommentUpdateRequestDto };
