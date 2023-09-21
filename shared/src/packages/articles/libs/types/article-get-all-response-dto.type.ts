import { type ArticleWithCountsResponseDto } from './article-with-counts-response-dto.type.js';

type ArticleGetAllResponseDto = {
  items: ArticleWithCountsResponseDto[];
  total: number;
};

export { type ArticleGetAllResponseDto };
