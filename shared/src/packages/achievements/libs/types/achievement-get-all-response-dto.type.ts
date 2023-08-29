import { type AchievementBaseResponseDto } from '~/packages/achievements/libs/types/achievement-base-response-dto.type.js';

type AchievementGetAllResponseDto = {
  items: AchievementBaseResponseDto[];
};

export { type AchievementGetAllResponseDto };