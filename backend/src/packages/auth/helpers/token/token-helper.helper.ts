import jwt from 'jsonwebtoken';

import { config } from '~/libs/packages/config/config.js';

type Parameters = {
  id: number;
};

const createToken = (id: Parameters): string => {
  return jwt.sign(id, config.ENV.JWT.SECRET, {
    expiresIn: config.ENV.JWT.EXPIRES_IN,
  });
};

const verifyToken = (token: string): string | jwt.JwtPayload =>
  jwt.verify(token, config.ENV.JWT.SECRET);

export { createToken, verifyToken };
