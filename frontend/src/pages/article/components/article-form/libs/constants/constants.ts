import { EMPTY_STRING } from '~/libs/constants/constants.js';
import { type ArticleRequestDto } from '~/packages/articles/articles.js';

const DEFAULT_ARTICLE_FORM_PAYLOAD: ArticleRequestDto = {
  title: EMPTY_STRING,
  text: EMPTY_STRING,
  genreId: null,
  publishedAt: null,
  promptId: null,
  coverId: null,
};

export { DEFAULT_ARTICLE_FORM_PAYLOAD };
export { ERROR_TYPE } from './error-type.constant.js';
export { PREVIOUS_PAGE_INDEX } from '~/libs/constants/constants.js';
