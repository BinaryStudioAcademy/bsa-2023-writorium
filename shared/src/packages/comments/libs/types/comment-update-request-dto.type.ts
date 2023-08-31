import { type CommentEntityType } from '~/packages/comments/libs/types/comment-entity.type.js';

type CommentUpdateRequestDto = Pick<CommentEntityType, 'text'>;

export { type CommentUpdateRequestDto };
