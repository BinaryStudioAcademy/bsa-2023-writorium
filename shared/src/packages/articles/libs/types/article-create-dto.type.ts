import { type ArticleEntityType } from './article-entity.type.js';

type ArticleCreateDto = Pick<
  ArticleEntityType,
  | 'title'
  | 'text'
  | 'userId'
  | 'promptId'
  | 'genreId'
  | 'publishedAt'
  | 'coverId'
>;

export { type ArticleCreateDto };
