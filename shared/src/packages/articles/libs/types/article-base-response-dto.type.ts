import { type ArticleEntityInstance } from '~/packages/articles/libs/types/types.js';

type ArticleBaseResponseDto = Pick<
  ArticleEntityInstance,
  | 'id'
  | 'title'
  | 'text'
  | 'userId'
  | 'promptId'
  | 'genreId'
  | 'publishedAt'
  | 'readTime'
  | 'coverId'
  | 'deletedAt'
>;

export { type ArticleBaseResponseDto };
