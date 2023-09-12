import { type ArticleEntityType } from '~/packages/articles/libs/types/article-entity.type.js';

type ArticleBaseResponseDto = Pick<
  ArticleEntityType,
  | 'id'
  | 'title'
  | 'text'
  | 'userId'
  | 'promptId'
  | 'genreId'
  | 'publishedAt'
  | 'coverId'
  | 'deletedAt'
>;

export { type ArticleBaseResponseDto };
