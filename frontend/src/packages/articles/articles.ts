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
export { getReadTimeString } from './libs/helpers/helpers.js';
export {
  type ArticleGetAllResponseDto,
  type ArticleReactionRequestDto,
  type ArticleReactionResponseDto,
  type ArticleRequestDto,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleUpdateRequestDto,
  type ArticleUpdateRequestPayload,
  type ArticleWithCommentCountResponseDto,
  type ArticleWithRelationsType,
  type ReactionResponseDto,
} from './libs/types/types.js';
export {
  articleCreateValidationSchema,
  articleUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
