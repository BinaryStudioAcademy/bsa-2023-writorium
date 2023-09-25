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
  ArticleImprovementSuggestionPriority,
  ArticlePublishStatus,
  ArticleReactionsSocketEvent,
  ArticleSocketEvent,
} from './libs/enums/enums.js';
export { getReadTimeString } from './libs/helpers/helpers.js';
export {
  type ArticleGenreStatsFilters,
  type ArticleGetAllResponseDto,
  type ArticleGetImprovementSuggestionsResponseDto,
  type ArticleImprovementSuggestion,
  type ArticleReactionRequestDto,
  type ArticleReactionResponseDto,
  type ArticleReactionsSocketEventPayload,
  type ArticleRequestDto,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleSocketEventPayload,
  type ArticleUpdateRequestDto,
  type ArticleUpdateRequestPayload,
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
  type ArticleWithRelations,
  type ReactionResponseDto,
} from './libs/types/types.js';
export {
  articleCreateValidationSchema,
  articlesFormFiltersValidationSchema,
  articleUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
