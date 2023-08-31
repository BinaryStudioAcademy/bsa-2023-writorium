import { type CommentEntityType } from '~/packages/comments/libs/types/comment-entity.type.js';

type CommentBaseRequestDto = Pick<CommentEntityType, 'text' | 'articleId'>;

export { type CommentBaseRequestDto };
