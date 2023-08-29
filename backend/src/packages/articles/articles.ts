import { logger } from '~/libs/packages/logger/logger.js';
import { openAIService } from '~/libs/packages/openai/openai.js';

import { ArticleController } from './article.controller.js';
import { ArticleModel } from './article.model.js';
import { ArticleRepository } from './article.repository.js';
import { ArticleService } from './article.service.js';

const articleRepository = new ArticleRepository(ArticleModel);
const articleService = new ArticleService(articleRepository, openAIService);
const articleController = new ArticleController(logger, articleService);

export { articleController, articleService };
export { ArticleModel } from './article.model.js';
