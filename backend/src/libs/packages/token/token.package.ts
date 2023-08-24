import * as jose from 'jose';

import { config, type IConfig } from '../config/config.js';

class Token {
  private secret: Uint8Array;

  public constructor(config: IConfig) {
    this.secret = new TextEncoder().encode(config.ENV.JWT.SECRET_KEY);
  }

  public create(payload: { id: number }): Promise<string> {
    return new jose.SignJWT(payload)
      .setProtectedHeader({ alg: config.AUTH.ALGORITHM })
      .setExpirationTime(config.AUTH.EXPIRES_IN)
      .sign(this.secret);
  }

  public verifyToken(token: string): Promise<jose.JWTVerifyResult> {
    return jose.jwtVerify(token, this.secret);
  }

  public decode(token: string): jose.JWTPayload {
    return jose.decodeJwt(token);
  }
}

export { Token };
