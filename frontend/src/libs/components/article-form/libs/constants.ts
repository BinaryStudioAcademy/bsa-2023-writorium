import { type ArticleCreateDto } from '~/packages/articles/articles.js';

const DEFAULT_ARTICLE_FORM_PAYLOAD: ArticleCreateDto = {
  title: '',
  text: '',
  userId: 1,
  promptId: 1,
  genreId: 1,
  publishedAt: null,
};

export { DEFAULT_ARTICLE_FORM_PAYLOAD };
