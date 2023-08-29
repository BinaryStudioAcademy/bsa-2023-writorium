import { type CommentEntityType } from '~/packages/comments/libs/types/comment-entity.type.js';

type CommentRequestDto = Pick<CommentEntityType, 'text' | 'articleId' | 'publishedAt'>;

export { type CommentRequestDto };
