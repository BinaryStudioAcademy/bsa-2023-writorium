import jwt from 'jsonwebtoken';

import { type ITokenPayload } from '~/libs/interfaces/interfaces.js';
import { config } from '~/libs/packages/config/config.js';

const createToken = (payload: { id: number }): string => {
  return jwt.sign(payload, config.ENV.JWT.SECRET, {
    expiresIn: config.ENV.JWT.EXPIRES_IN,
  });
};

const verifyToken = (token: string): ITokenPayload =>
  jwt.verify(token, config.ENV.JWT.SECRET) as ITokenPayload;

export { createToken, verifyToken };
