import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { UserApi } from './users-api.package.js';

const userApi = new UserApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { userApi };
export {
  type UserAuthResponseDto,
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
