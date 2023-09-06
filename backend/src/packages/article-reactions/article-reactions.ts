import { logger } from '~/libs/packages/logger/logger.js';

import { ArticleReactionController } from './article-reaction.controller.js';
import { ArticleReactionModel } from './article-reaction.model.js';
import { ArticleReactionRepository } from './article-reaction.repository.js';
import { ArticleReactionService } from './article-reaction.service.js';

const articleReactionRepository = new ArticleReactionRepository(
  ArticleReactionModel,
);
const articleReactionService = new ArticleReactionService(
  articleReactionRepository,
);
const articleReactionController = new ArticleReactionController(
  logger,
  articleReactionService,
);

export { articleReactionController, articleReactionService };
export { ArticleReactionModel } from './article-reaction.model.js';
