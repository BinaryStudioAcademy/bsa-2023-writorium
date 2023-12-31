import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { AuthApi } from './auth-api.package.js';

const authApi = new AuthApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { authApi };
export {
  type AuthLoginWithGoogleDto,
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
  type UserSignInWithFacebookResponseDto,
} from './libs/types/types.js';
export {
  requestPasswordValidationSchema,
  resetPasswordValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
