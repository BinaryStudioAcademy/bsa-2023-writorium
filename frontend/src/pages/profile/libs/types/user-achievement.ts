import { type AchievementBaseResponseDto } from '~/packages/achievements/achievements.js';

type UserAchievement = AchievementBaseResponseDto & {
  progress: number;
};

export { type UserAchievement };
