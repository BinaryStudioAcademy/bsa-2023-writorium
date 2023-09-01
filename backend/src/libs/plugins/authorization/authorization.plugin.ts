import { type FastifyInstance, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  HttpCode,
  HttpError,
  type HttpMethod,
} from '~/libs/packages/http/http.js';
import { type WhiteRoute } from '~/libs/packages/server-application/server-application.js';
import { type IToken } from '~/libs/packages/token/token.js';
import { type UserService } from '~/packages/users/users.js';

import { SERVED_PAGE_PATH } from './libs/constants/constants.js';

type AuthorizationPluginParameters = {
  whiteRoutesConfig: readonly WhiteRoute[];
  userService: UserService;
  token: IToken;
};

const authorization = fp(
  (
    fastify: FastifyInstance,
    { whiteRoutesConfig, userService, token }: AuthorizationPluginParameters,
    done,
  ) => {
    fastify.decorateRequest('user', null);

    fastify.addHook('onRequest', async (request: FastifyRequest) => {
      const { headers, method, routerPath } = request;

      const isServedPagePath = routerPath === SERVED_PAGE_PATH;

      if (isServedPagePath) {
        return;
      }

      const isWhiteRoute = whiteRoutesConfig.some((whiteRoute) => {
        const isWhitePath = whiteRoute.routerPath.test(routerPath);
        const isAllowedMethod = whiteRoute.methods.includes(
          method as HttpMethod,
        );

        return isWhitePath && isAllowedMethod;
      });

      if (isWhiteRoute) {
        return;
      }

      const [, requestToken] = headers.authorization?.split(' ') ?? [];

      if (!requestToken) {
        throw new HttpError({
          message: 'Authorization header should be in format: Bearer <token>',
          status: HttpCode.UNAUTHORIZED,
        });
      }

      const { userId } = await token.verifyToken<{ userId?: number }>(
        requestToken,
      );

      if (!userId) {
        throw new HttpError({
          message: 'Invalid token',
          status: HttpCode.UNAUTHORIZED,
        });
      }

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
