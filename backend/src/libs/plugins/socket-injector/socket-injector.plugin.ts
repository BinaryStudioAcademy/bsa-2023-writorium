import fp from 'fastify-plugin';

import { type SocketServer } from '~/libs/packages/socket/socket.js';

type SocketInjectorPluginOptions = {
  io: SocketServer;
};

const socketInjectorPlugin = fp(
  (fastify, { io }: SocketInjectorPluginOptions, done) => {
    fastify.decorateRequest('io', null);

    fastify.addHook('preHandler', (request, _reply, hookDone) => {
      request.io = io;
      hookDone();
    });

    done();
  },
);

export { socketInjectorPlugin };
