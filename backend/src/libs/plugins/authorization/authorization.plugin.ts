import fp from 'fastify-plugin';

import { ExceptionMessage } from '~/libs/enums/enums.js';
import { InvalidCredentialsError } from '~/libs/exceptions/exceptions.js';
import { type IFastifyRequest } from '~/libs/interfaces/interfaces.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type AuthService } from '~/packages/auth/auth.service';
import { type UserService } from '~/packages/users/user.service';

type Options = {
  routesWhiteList: Set<string>;
  services: {
    userService: UserService;
    authService: AuthService;
  };
};

const authorization = fp((fastify, { routesWhiteList, services }: Options) => {
  fastify.decorateRequest('user', null);

  fastify.addHook('onRequest', async (request, reply) => {
    try {
      const isWhiteRoute = routesWhiteList.has(request.routerPath);

      if (isWhiteRoute) {
        return;
      }

      const [, token] = request.headers?.authorization?.split(' ') ?? [];
      const { userService, authService } = services;
      const { id } = authService.verifyToken(token);

      const authorizedUser = await userService.findById(id);
      if (!authorizedUser) {
        throw new InvalidCredentialsError(ExceptionMessage.INVALID_TOKEN);
      }

      (<IFastifyRequest>request).user = authorizedUser;
    } catch (error) {
      void reply.code(HttpCode.UNAUTHORIZED).send(error);
    }
  });
});

export { authorization };
