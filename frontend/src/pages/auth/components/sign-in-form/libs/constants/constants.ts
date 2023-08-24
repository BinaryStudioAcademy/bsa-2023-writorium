import { type UserSignInRequestDto } from '~/packages/users/libs/types/types.js';

const DEFAULT_LOGIN_PAYLOAD: UserSignInRequestDto = {
  email: '',
  password: '',
} as const;

export { DEFAULT_LOGIN_PAYLOAD };
