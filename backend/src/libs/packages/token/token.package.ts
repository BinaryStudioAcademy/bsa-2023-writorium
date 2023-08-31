import { type JWTPayload, jwtVerify, SignJWT } from 'jose';

import { type IConfig } from '../config/config.js';
import { type IToken } from './libs/interfaces/interfaces.js';

class Token implements IToken {
  private secret: Uint8Array;
  private algorithm: string;
  private expirationTime: string;

  public constructor(config: IConfig) {
    this.secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);
    this.algorithm = config.AUTH.ALGORITHM;
    this.expirationTime = config.AUTH.EXPIRES_IN;
  }

  public create<T extends Record<string, unknown>>(
    payload: T,
    expirationTime: string = this.expirationTime,
  ): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: this.algorithm })
      .setExpirationTime(expirationTime)
      .sign(this.secret);
  }

  public async verifyToken<T extends Record<string, unknown>>(
    token: string,
  ): Promise<JWTPayload & T> {
    const { payload } = await jwtVerify(token, this.secret);

    return payload as JWTPayload & T;
  }
}

export { Token };
