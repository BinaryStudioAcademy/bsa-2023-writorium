import { type GenreEntityType } from '~/packages/genres/lib/types/types.js';

type DetectedArticleGenre = Pick<GenreEntityType, 'key' | 'name'>;

export { type DetectedArticleGenre };
