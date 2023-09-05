import { type ArticleRequestDto } from '~/packages/articles/articles.js';

const DEFAULT_ARTICLE_FORM_PAYLOAD: ArticleRequestDto = {
  title: '',
  text: '',
  genreId: null,
  publishedAt: null,
  promptId: null,
};

export { DEFAULT_ARTICLE_FORM_PAYLOAD };
