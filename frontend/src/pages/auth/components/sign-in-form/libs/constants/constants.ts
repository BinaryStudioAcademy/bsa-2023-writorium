import { EMPTY_STRING } from '~/libs/constants/constants.js';
import { type UserSignInRequestDto } from '~/packages/users/users.js';

const DEFAULT_LOGIN_PAYLOAD: UserSignInRequestDto = {
  email: EMPTY_STRING,
  password: EMPTY_STRING,
} as const;

export { DEFAULT_LOGIN_PAYLOAD };
