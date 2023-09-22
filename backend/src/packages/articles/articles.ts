import { logger } from '~/libs/packages/logger/logger.js';
import { openAIService } from '~/libs/packages/openai/openai.js';

import { achievementService } from '../achievements/achievements.js';
import { articleViewService } from '../article-views/article-views.js';
import { followRepository } from '../follow/follow.js';
import { genreRepository } from '../genres/genre.js';
import { ArticleController } from './article.controller.js';
import { ArticleModel } from './article.model.js';
import { ArticleRepository } from './article.repository.js';
import { ArticleService } from './article.service.js';
import { FavouredUserArticlesModel } from './favoured-user-articles.model.js';

const articleRepository = new ArticleRepository(
  ArticleModel,
  FavouredUserArticlesModel,
);
const articleService = new ArticleService({
  articleRepository,
  openAIService,
  genreRepository,
  achievementService,
  articleViewService,
  followRepository,
});
const articleController = new ArticleController(logger, articleService);

export { articleController, articleService };
export { ArticleModel } from './article.model.js';
export { ArticlePublishStatus } from './libs/enums/enums.js';
export { type ArticleGenreStatsFilters } from './libs/types/types.js';
export { articleGenreStatsFiltersValidationSchema } from './libs/validation-schemas/validation-schemas.js';
