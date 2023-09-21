import { type ArticleSocketEvent } from '../enums/article-socket-event.enum.js';
import { type ArticleWithCountsResponseDto } from './article-with-counts-response-dto.type.js';

type ArticleSocketEventPayload = {
  [ArticleSocketEvent.NEW_ARTICLE]: ArticleWithCountsResponseDto;
};

export { type ArticleSocketEventPayload };
