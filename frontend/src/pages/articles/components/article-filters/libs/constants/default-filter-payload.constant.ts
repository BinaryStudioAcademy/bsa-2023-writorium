import { type FilterFormValues } from '~/pages/articles/libs/types/types.js';

const DEFAULT_FILTER_PAYLOAD: FilterFormValues = {
  titleFilter: '',
  authorId: null,
  genreId: null,
  showFavourites: false,
} as const;

export { DEFAULT_FILTER_PAYLOAD };
