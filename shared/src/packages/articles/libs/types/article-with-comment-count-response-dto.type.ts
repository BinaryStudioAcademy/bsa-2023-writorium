import { type ArticleCommentCount } from './article-comment-count.type.js';
import { type ArticleResponseDto } from './article-response-dto.type.js';

type ArticleWithCommentCountResponseDto = ArticleResponseDto &
  ArticleCommentCount;

export { type ArticleWithCommentCountResponseDto };
