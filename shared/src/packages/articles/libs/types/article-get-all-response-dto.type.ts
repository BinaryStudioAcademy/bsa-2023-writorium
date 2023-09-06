import { type ArticleWithAuthorType } from './article-with-author.type.js';

type ArticleGetAllResponseDto = {
  items: ArticleWithAuthorType[];
  total: number;
};

export { type ArticleGetAllResponseDto };
