import { type ArticleReactionsSocketEvent } from '../enums/article-reactions-socket-event.enum.js';
import { type ArticleReactionResponseDto } from './article-reaction-response-dto.type.js';

type ArticleReactionsSocketEventPayload = {
  [ArticleReactionsSocketEvent.NEW_REACTION]: ArticleReactionResponseDto;
};

export { type ArticleReactionsSocketEventPayload };
