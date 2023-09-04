import { type TokenExpirationTime } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

interface IAuthConfig {
  ALGORITHM: string;
  EXPIRES_IN: ValueOf<typeof TokenExpirationTime>;
}

export { type IAuthConfig };
