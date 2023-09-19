import { type PaginationParameters } from '~/libs/types/types.js';

type ArticlesFilters = PaginationParameters & {
  genreId?: number | null;
  titleFilter?: string;
  authorId?: number | null;
  showFavourites?: boolean;
};

export { type ArticlesFilters };
