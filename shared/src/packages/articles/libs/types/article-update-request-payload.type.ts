import { type ArticleUpdateRequestDto } from './article-update-request-dto.type.js';

type ArticleUpdateRequestPayload = {
  articleId: number;
  articleForUpdate: ArticleUpdateRequestDto;
};

export { type ArticleUpdateRequestPayload };
