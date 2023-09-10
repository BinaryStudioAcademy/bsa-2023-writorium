import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { ArticleApi } from './articles-api.package.js';

const articleApi = new ArticleApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { articleApi };
export {
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
  type ArticlesFilters,
  type ArticleWithAuthorType,
} from './libs/types/types.js';
export { articleCreateValidationSchema } from './libs/validation-schemas/validation-schemas.js';
