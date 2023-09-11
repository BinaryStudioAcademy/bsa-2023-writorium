import { type ArticleResponseDto } from './article-response-dto.type.js';

type ArticleGetAllResponseDto = {
  items: ArticleResponseDto[];
  total: number;
};

export { type ArticleGetAllResponseDto };
