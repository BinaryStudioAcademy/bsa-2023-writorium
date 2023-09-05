import { type CommentBaseResponseDto } from '~/packages/comments/libs/types/comment-base-response-dto.type.js';

type CommentGetAllResponseDto = {
  items: CommentBaseResponseDto[];
};

export { type CommentGetAllResponseDto };
