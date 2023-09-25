import { type CommentEntityInstance } from '~/packages/comments/libs/types/comment-entity-instance.type.js';

type CommentBaseRequestDto = Pick<CommentEntityInstance, 'text' | 'articleId'>;

export { type CommentBaseRequestDto };
