import { type ArticleEntityInstance } from './article-entity-instance.type.js';

type ArticleCreateDto = Pick<
  ArticleEntityInstance,
  | 'title'
  | 'text'
  | 'userId'
  | 'promptId'
  | 'genreId'
  | 'publishedAt'
  | 'coverId'
>;

export { type ArticleCreateDto };
