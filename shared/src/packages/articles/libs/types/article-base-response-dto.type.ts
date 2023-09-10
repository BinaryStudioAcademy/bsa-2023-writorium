import { type ArticleEntityType } from '~/packages/articles/libs/types/types.js';

type ArticleBaseResponseDto = Pick<
  ArticleEntityType,
  | 'id'
  | 'title'
  | 'text'
  | 'userId'
  | 'promptId'
  | 'genreId'
  | 'publishedAt'
  | 'readTime'
>;

export { type ArticleBaseResponseDto };
