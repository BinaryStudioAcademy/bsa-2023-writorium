import { type Achievement } from '~/packages/achievements/libs/types/achievement.type.js';

type AchievementBaseResponseDto = Pick<
  Achievement,
  'id' | 'key' | 'name' | 'description' | 'breakpoint' | 'referenceTable'
>;

export { type AchievementBaseResponseDto };
