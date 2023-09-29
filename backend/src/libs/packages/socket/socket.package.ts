import { type default as Fastify } from 'fastify';
import { type Socket } from 'socket.io';

import { type ValueOf } from '~/libs/types/types.js';

import { type SocketRoom } from './libs/enums/enums.js';
import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { SocketServer } from './libs/types/types.js';

class SocketService {
  private '_io': SocketServer;

  public get io(): SocketServer {
    return this._io;
  }

  public initializeIo = (
    server: ReturnType<typeof Fastify>['server'],
  ): void => {
    this._io = new SocketServer(server);

    const appNamespaces = [
      SocketNamespace.ARTICLES,
      SocketNamespace.COMMENTS,
      SocketNamespace.REACTIONS,
      SocketNamespace.APPLICATION,
    ];

    for (const namespace of appNamespaces) {
      this.io
        .of(namespace)
        .on(SocketEvent.CONNECTION, (socket: Socket) =>
          this.handleNamespaceConnection(socket),
        );
    }
  };

  private handleNamespaceConnection = (socket: Socket): void => {
    socket.on(SocketEvent.JOIN_ROOM, (roomId: ValueOf<typeof SocketRoom>) => {
      void socket.join(roomId);
    });

    socket.on(SocketEvent.LEAVE_ROOM, (roomId: ValueOf<typeof SocketRoom>) => {
      void socket.leave(roomId);
    });
  };
}

export { SocketService };
