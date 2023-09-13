import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { CommentsApi } from './comments-api.package.js';

const commentsApi = new CommentsApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { commentsApi };
export {
  type CommentBaseRequestDto,
  type CommentBaseResponseDto,
  type CommentGetAllResponseDto,
  type CommentUpdateRequestDto,
  type CommentWithRelationsResponseDto,
} from './libs/types/types.js';
export {
  commentCreateValidationSchema,
  commentUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
