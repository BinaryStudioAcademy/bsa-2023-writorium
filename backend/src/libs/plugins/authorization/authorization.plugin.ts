import fp from 'fastify-plugin';

import {
  HttpCode,
  HttpError,
  type HttpMethod,
} from '~/libs/packages/http/http.js';
import { type WhiteRoute } from '~/libs/packages/server-application/libs/types/types.js';
import { token } from '~/libs/packages/token/token.js';
import { type UserService } from '~/packages/users/user.service';

type Options = {
  routesWhiteList: WhiteRoute[];
  services: {
    userService: UserService;
  };
};

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
          message: 'Authorization header should be present.',
        });
      }

      const [, requestToken] = authorizationHeader.split(' ');

      if (!requestToken) {
        throw new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message: 'Invalid token.',
        });
      }

      const { userService } = services;
      const { userId } = await token.verifyToken<{ userId: number }>(
        requestToken,
      );

      const authorizedUser = await userService.find(userId);

      if (!authorizedUser) {
        throw new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message:
            'You do not have the necessary authorization to access this resource. Please log in.',
        });
      }

      request.user = authorizedUser;
    });

    done();
  },
);

export { authorization };
