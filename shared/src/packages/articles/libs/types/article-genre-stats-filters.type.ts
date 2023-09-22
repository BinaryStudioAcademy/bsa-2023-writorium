import { type ValueOf } from '~/libs/types/types.js';

import { type ArticlePublishStatus } from '../enums/article-publish-status.enum.js';

type ArticleGenreStatsFilters = {
  articlePublishedStatus?: ValueOf<typeof ArticlePublishStatus> | null;
};

export { type ArticleGenreStatsFilters };
