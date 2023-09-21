import { type ArticleCounts } from './article-counts.type.js';
import { type ArticleResponseDto } from './article-response-dto.type.js';

type ArticleWithCountsResponseDto = ArticleResponseDto & ArticleCounts;

export { type ArticleWithCountsResponseDto };
