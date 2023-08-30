import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { PromptApi } from './prompts-api.package.js';

const promptApi = new PromptApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { promptApi };
export { type PromptBaseResponseDto } from './libs/types/types.js';
