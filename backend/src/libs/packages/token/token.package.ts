import { type JWTPayload, jwtVerify, SignJWT } from 'jose';

import { type TokenExpirationTime } from '~/libs/enums/enums.js';
import { ExceptionMessage } from '~/libs/enums/enums.js';
import { UnauthorizedError } from '~/libs/packages/exceptions/exceptions.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type IConfig } from '../config/config.js';
import { type IToken } from './libs/interfaces/interfaces.js';

class Token implements IToken {
  private secret: Uint8Array;
  private algorithm: string;
  private expirationTime: ValueOf<typeof TokenExpirationTime>;

  public constructor(config: IConfig) {
    this.secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);
    this.algorithm = config.AUTH.ALGORITHM;
    this.expirationTime = config.AUTH.EXPIRES_IN;
  }

  public create<T extends Record<string, unknown>>(
    payload: T,
    expirationTime: ValueOf<typeof TokenExpirationTime> = this.expirationTime,
  ): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: this.algorithm })
      .setExpirationTime(expirationTime)
      .sign(this.secret);
  }

  public async verifyToken<T extends Record<string, unknown>>(
    token: string,
  ): Promise<JWTPayload & T> {
    try {
      const { payload } = await jwtVerify(token, this.secret);

      return payload as JWTPayload & T;
    } catch {
      throw new UnauthorizedError(ExceptionMessage.INVALID_TOKEN);
    }
  }
}

export { Token };
