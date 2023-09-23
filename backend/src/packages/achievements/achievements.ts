import { logger } from '~/libs/packages/logger/logger.js';

import { AchievementController } from './achievement.controller.js';
import { AchievementModel } from './achievement.model.js';
import { AchievementRepository } from './achievement.repository.js';
import { AchievementService } from './achievement.service.js';
import { UserAchievementModel } from './user-achievements.model.js';

const achievementRepository = new AchievementRepository(
  AchievementModel,
  UserAchievementModel,
);
const achievementService = new AchievementService(achievementRepository);
const achievementController = new AchievementController(
  logger,
  achievementService,
);

export { achievementController, achievementService };
export { AchievementModel } from './achievement.model.js';
