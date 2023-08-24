import fp from 'fastify-plugin';
import { type JWTPayload } from 'jose';

import {
  HttpCode,
  HttpError,
  type HttpMethod,
} from '~/libs/packages/http/http.js';
import { type WhiteRoute } from '~/libs/packages/server-application/libs/types/types.js';
import { token } from '~/libs/packages/token/token.js';
import { type AuthService } from '~/packages/auth/auth.service';
import { type UserService } from '~/packages/users/user.service';

type Options = {
  routesWhiteList: WhiteRoute[];
  services: {
    userService: UserService;
    authService: AuthService;
  };
};

interface IPayload extends JWTPayload {
  id: number;
}

const errorMessage =
  'You do not have the necessary authorization to access this resource. Please log in.';

const authorization = fp(
  (fastify, { routesWhiteList, services }: Options, done) => {
    fastify.decorateRequest('user', null);

    fastify.addHook('onRequest', async (request) => {
      const isWhiteRoute = routesWhiteList.some((whiteRoute) => {
        const isWhitePath = whiteRoute.routerPath === request.routerPath;
        const isAllowedMethod = whiteRoute.methods.includes(
          request.method as HttpMethod,
        );
        return isWhitePath && isAllowedMethod;
      });

      if (isWhiteRoute) {
        return;
      }

      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        throw new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message: errorMessage,
        });
      }

      const [, requestToken] = authorizationHeader.split(' ');

      if (!requestToken) {
        throw new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message: errorMessage,
        });
      }

      const { userService } = services;
      const { payload } = await token.verifyToken(requestToken);
      const id: IPayload['id'] = payload.id as IPayload['id'];

      const authorizedUser = await userService.find(id);

      if (!authorizedUser) {
        throw new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message: errorMessage,
        });
      }

      request.user = authorizedUser;
    });

    done();
  },
);

export { authorization };
