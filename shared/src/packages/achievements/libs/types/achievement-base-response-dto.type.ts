import { type AchievementEntityType } from '~/packages/achievements/libs/types/achievement-entity.type.js';

type AchievementBaseResponseDto = Pick<
AchievementEntityType,
  'id' | 'key' | 'name' | 'description'
>;

export { type AchievementBaseResponseDto };
