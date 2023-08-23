import { type UserAuthRequestDto } from '~/packages/users/libs/types/types.js';

const DEFAULT_LOGIN_PAYLOAD: UserAuthRequestDto = {
  email: '',
  password: ''
} as const;

export { DEFAULT_LOGIN_PAYLOAD };
