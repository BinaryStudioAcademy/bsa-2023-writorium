import { type NavigateFunction } from 'react-router-dom';

import { type ArticleUpdateRequestDto } from './article-update-request-dto.type.js';

type ArticleUpdateRequestPayload = {
  articleId: number;
  articleForUpdate: ArticleUpdateRequestDto;
  navigate?: NavigateFunction;
};

export { type ArticleUpdateRequestPayload };
