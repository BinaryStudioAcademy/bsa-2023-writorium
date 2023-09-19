import { logger } from '~/libs/packages/logger/logger.js';
import { openAIService } from '~/libs/packages/openai/openai.js';

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
});
const articleController = new ArticleController(logger, articleService);

export { articleController, articleService };
export { ArticleModel } from './article.model.js';
