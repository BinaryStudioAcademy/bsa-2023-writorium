import { EMPTY_STRING } from '~/libs/constants/constants.js';

const DEFAULT_PAYLOAD = {
  password: EMPTY_STRING,
  confirmPassword: EMPTY_STRING,
  resetPasswordToken: EMPTY_STRING,
} as const;

export { DEFAULT_PAYLOAD };
