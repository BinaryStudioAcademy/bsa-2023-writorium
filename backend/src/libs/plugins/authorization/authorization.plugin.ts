import { type FastifyInstance, type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import { ExceptionMessage } from '~/libs/enums/enums.js';
import { UnauthorizedError } from '~/libs/packages/exceptions/exceptions.js';
import { type HttpMethod } from '~/libs/packages/http/http.js';
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
        throw new UnauthorizedError(ExceptionMessage.AUTHORIZATION_HEADER);
      }

      const { userId } = await token.verifyToken<{
        userId?: number;
      }>(requestToken);

      if (!userId) {
        throw new UnauthorizedError(ExceptionMessage.INVALID_TOKEN);
      }

      const authorizedUser = await userService.find(userId);

      if (!authorizedUser) {
        throw new UnauthorizedError(ExceptionMessage.DO_NOT_HAVE_AUTHORIZATION);
      }

      request.user = authorizedUser;
    });

    done();
  },
);

export { authorization };
