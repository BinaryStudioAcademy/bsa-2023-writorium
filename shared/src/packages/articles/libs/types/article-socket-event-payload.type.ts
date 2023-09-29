import { type ArticleSocketEvent } from '../enums/article-socket-event.enum.js';
import { type ArticleWithCountsResponseDto } from './article-with-counts-response-dto.type.js';

type ArticleSocketEventPayload = {
  [ArticleSocketEvent.NEW_ARTICLE]: {
    isByFollowingAuthor: boolean;
    article: ArticleWithCountsResponseDto;
    socketUserId: number;
  };
};

export { type ArticleSocketEventPayload };
