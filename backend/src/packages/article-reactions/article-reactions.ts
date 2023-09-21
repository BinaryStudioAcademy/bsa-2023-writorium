import { logger } from '~/libs/packages/logger/logger.js';
import { socketService } from '~/libs/packages/socket/socket.js';

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
const articleReactionController = new ArticleReactionController({
  logger,
  articleReactionService,
  socketService,
});

export { articleReactionController, articleReactionService };
export { ArticleReactionModel } from './article-reaction.model.js';
export { ArticleReactionsSocketEvent } from './libs/enums/enums.js';
export { type ArticleReactionsSocketEventPayload } from './libs/types/types.js';
