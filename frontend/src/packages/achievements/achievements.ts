import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { AchievementsApi } from './achievements-api.package.js';

const achievementsApi = new AchievementsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { achievementsApi };
export { PercentageProgress } from './libs/enums/enums.js';
export {
  type AchievementWithParsedDescription,
  type AchievementWithProgressResponseDto,
  type ParsedAchievementDescription,
} from './libs/types/types.js';
