import { type ArticleEntityInstance } from '~/packages/articles/libs/types/article-entity-instance.type.js';

type ArticleRequestDto = Pick<
  ArticleEntityInstance,
  'title' | 'text' | 'promptId' | 'genreId' | 'publishedAt' | 'coverId'
>;

export { type ArticleRequestDto };
