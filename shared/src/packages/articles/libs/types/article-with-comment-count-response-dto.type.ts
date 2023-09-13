import { type ArticleCommentCount } from './article-comment-count.type.js';
import { type ArticleWithRelationsType } from './article-with-relations.type.js';

type ArticleWithCommentCountResponseDto = ArticleWithRelationsType &
  ArticleCommentCount;

export { type ArticleWithCommentCountResponseDto };
