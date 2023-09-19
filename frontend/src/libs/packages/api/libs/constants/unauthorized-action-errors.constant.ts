import { ExceptionMessage } from '~/libs/enums/enums.js';

const UNAUTHORIZED_ACTION_ERRORS: readonly string[] = [
  ExceptionMessage.INVALID_TOKEN,
  ExceptionMessage.AUTHORIZATION_HEADER,
  ExceptionMessage.DO_NOT_HAVE_AUTHORIZATION,
] as const;

export { UNAUTHORIZED_ACTION_ERRORS };
