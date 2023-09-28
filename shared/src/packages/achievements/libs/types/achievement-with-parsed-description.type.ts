import { type AchievementWithProgressResponseDto } from './achievement-with-progress-response-dto.type.js';
import { type ParsedAchievementDescription } from './parsed-achievement-description-type.js';

type AchievementWithParsedDescription = Omit<
  AchievementWithProgressResponseDto,
  'description'
> & { description: ParsedAchievementDescription };

export { type AchievementWithParsedDescription };
