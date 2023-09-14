import { type ArticleRequestDto } from '~/packages/articles/articles.js';

const DEFAULT_ARTICLE_FORM_PAYLOAD: ArticleRequestDto = {
  title: '',
  text: '',
  genreId: null,
  publishedAt: null,
  promptId: null,
  coverId: null,
};

const PREVIOUS_PAGE_INDEX = -1;

export { DEFAULT_ARTICLE_FORM_PAYLOAD, PREVIOUS_PAGE_INDEX };
