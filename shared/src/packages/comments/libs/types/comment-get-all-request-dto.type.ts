import { type CommentEntityType } from '~/packages/comments/libs/types/comment-entity.type.js';

type CommentGetAllRequestDto = Pick<CommentEntityType, 'articleId'>;

export { type CommentGetAllRequestDto };
