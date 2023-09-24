import { type AchievementBaseResponseDto } from './achievement-base-response-dto.type.js';

type AchievementWithProgressResponseDto = AchievementBaseResponseDto & {
  progress: number;
};

export { type AchievementWithProgressResponseDto };
