import { type ArticleSocketEvent } from '../enums/article-socket-event.enum.js';
import { type ArticleWithCommentCountResponseDto } from './article-with-comment-count-response-dto.type.js';

type ArticleSocketEventPayload = {
  [ArticleSocketEvent.NEW_ARTICLE]: ArticleWithCommentCountResponseDto;
};

export { type ArticleSocketEventPayload };
