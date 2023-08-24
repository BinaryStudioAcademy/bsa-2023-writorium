import { type JWTPayload, jwtVerify, SignJWT } from 'jose';

import { type IConfig } from '../config/config.js';

class Token {
  private secret: Uint8Array;
  private algorithm: string;
  private expirationTime: string;

  public constructor(config: IConfig) {
    this.secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);
    this.algorithm = config.AUTH.ALGORITHM;
    this.expirationTime = config.AUTH.EXPIRES_IN;
  }

  public create(payload: { id: number }): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: this.algorithm })
      .setExpirationTime(this.expirationTime)
      .sign(this.secret);
  }

  public async verifyToken(
    token: string,
  ): Promise<JWTPayload & { id: number }> {
    const { payload } = await jwtVerify(token, this.secret);

    return payload as JWTPayload & { id: number };
  }
}

export { Token };
