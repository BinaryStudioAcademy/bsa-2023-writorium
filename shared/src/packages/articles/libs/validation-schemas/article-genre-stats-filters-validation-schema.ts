import joi from 'joi';

import { ArticlePublishStatus } from '../enums/article-publish-status.enum.js';
import { type ArticleGenreStatsFilters } from '../types/article-genre-stats-filters.type.js';

const articleGenreStatsFilters = joi.object<ArticleGenreStatsFilters, true>({
  articlePublishedStatus: joi
    .string()
    .trim()
    .valid(ArticlePublishStatus.DRAFT, ArticlePublishStatus.PUBLISHED)
    .allow(null),
});

export { articleGenreStatsFilters };
