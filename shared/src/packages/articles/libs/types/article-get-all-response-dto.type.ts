import { type ArticleWithCommentCountResponseDto } from './article-with-comment-count-response-dto.type.js';

type ArticleGetAllResponseDto = {
  items: ArticleWithCommentCountResponseDto[];
  total: number;
};

export { type ArticleGetAllResponseDto };
