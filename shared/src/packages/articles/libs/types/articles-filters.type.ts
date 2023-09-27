import { type PaginationParameters } from '~/libs/types/types.js';

type ArticlesFilters = PaginationParameters & {
  genreId?: number | null;
  titleFilter?: string;
  authorId?: number | null;
  shouldShowFavourites?: boolean;
  shouldShowFollowedAuthorsArticles?: boolean;
};

export { type ArticlesFilters };
