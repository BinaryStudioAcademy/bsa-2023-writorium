import { EMPTY_STRING } from '~/libs/constants/constants.js';
import { type UserSignUpRequestDto } from '~/packages/users/users.js';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: EMPTY_STRING,
  password: EMPTY_STRING,
  firstName: EMPTY_STRING,
  lastName: EMPTY_STRING,
};

export { DEFAULT_SIGN_UP_PAYLOAD };
