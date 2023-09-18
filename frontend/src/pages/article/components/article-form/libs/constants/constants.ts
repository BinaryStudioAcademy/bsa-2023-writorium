import { type ArticleRequestDto } from '~/packages/articles/articles.js';

const DEFAULT_ARTICLE_FORM_PAYLOAD: ArticleRequestDto = {
  title: '',
  text: '',
  genreId: null,
  publishedAt: null,
  promptId: null,
  coverId: null,
};

export { DEFAULT_ARTICLE_FORM_PAYLOAD };
export { PREVIOUS_PAGE_INDEX } from '~/libs/constants/constants.js';
