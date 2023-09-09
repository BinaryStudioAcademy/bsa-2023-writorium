import { type ArticleWithRelationsType } from './article-with-relations.type.js';

type ArticleGetAllResponseDto = {
  items: ArticleWithRelationsType[];
  total: number;
};

export { type ArticleGetAllResponseDto };
