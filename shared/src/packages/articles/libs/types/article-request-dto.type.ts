import { type ArticleEntityType } from '~/packages/articles/libs/types/article-entity.type.js';

type ArticleRequestDto = Pick<
  ArticleEntityType,
  'title' | 'text' | 'promptId' | 'genreId' | 'publishedAt'
>;

export { type ArticleRequestDto };
