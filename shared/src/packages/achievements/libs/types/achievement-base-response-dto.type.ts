import { type Achievement } from '~/packages/achievements/libs/types/achievement.type.js';

type AchievementBaseResponseDto = Pick<
  Achievement,
  'id' | 'key' | 'name' | 'description'
>;

export { type AchievementBaseResponseDto };
