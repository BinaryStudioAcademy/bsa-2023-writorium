import { type CommentWithRelationsResponseDto } from '~/packages/comments/libs/types/comment-with-relations-response-dto.type.js';

type CommentGetAllResponseDto = {
  items: CommentWithRelationsResponseDto[];
};

export { type CommentGetAllResponseDto };
