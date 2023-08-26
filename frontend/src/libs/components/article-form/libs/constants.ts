import { type ArticleCreateRequestDto } from '~/packages/articles/articles.js';

const DEFAULT_ARTICLE_FORM_PAYLOAD: ArticleCreateRequestDto = {
  title: '',
  text: '',
  genreId: 1,
  publishedAt: null,
};

export { DEFAULT_ARTICLE_FORM_PAYLOAD };
