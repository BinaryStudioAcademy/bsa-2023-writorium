import { type CommentsSocketEvent } from '../enums/comments-socket-event.enum.js';
import { type CommentWithRelationsResponseDto } from './comment-with-relations-response-dto.type.js';

type CommentsSocketEventPayload = {
  [CommentsSocketEvent.NEW_COMMENT]: CommentWithRelationsResponseDto;
};

export { type CommentsSocketEventPayload };
