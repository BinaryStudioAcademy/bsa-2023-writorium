import { config } from '~/libs/packages/config/config.js';
import { database } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { achievementController } from '~/packages/achievements/achievements.js';
import { articleController } from '~/packages/articles/articles.js';
import { articleReactionController } from '~/packages/article-reactions/article-reactions.js';
import { authController } from '~/packages/auth/auth.js';
import { commentController } from '~/packages/comments/comments.js';
import { fileController } from '~/packages/files/files.js';
import { genreController } from '~/packages/genres/genre.js';
import { promptController } from '~/packages/prompts/prompts.js';
import { userController } from '~/packages/users/users.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  config,
  ...authController.routes,
  ...userController.routes,
  ...genreController.routes,
  ...fileController.routes,
  ...articleController.routes,
  ...articleReactionController.routes,
  ...commentController.routes,
  ...promptController.routes,
  ...achievementController.routes,
);
const serverApp = new ServerApp({
  config,
  logger,
  database,
  apis: [apiV1],
});

export { serverApp };
export {
  type ServerAppRouteParameters,
  type WhiteRoute,
} from './libs/types/types.js';
