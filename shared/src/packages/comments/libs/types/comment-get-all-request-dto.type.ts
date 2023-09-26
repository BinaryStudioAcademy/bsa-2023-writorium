import { type CommentEntityInstance } from '~/packages/comments/libs/types/comment-entity-instance.type.js';

type CommentGetAllRequestDto = Pick<CommentEntityInstance, 'articleId'>;

export { type CommentGetAllRequestDto };
