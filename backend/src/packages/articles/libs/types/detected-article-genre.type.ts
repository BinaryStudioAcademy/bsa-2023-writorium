import { type GenreEntityInstance } from '~/packages/genres/lib/types/types.js';

type DetectedArticleGenre = Pick<GenreEntityInstance, 'key' | 'name'>;

export { type DetectedArticleGenre };
