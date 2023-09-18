import { type default as Fastify } from 'fastify';
import { type Socket } from 'socket.io';

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

    this.io
      .of(SocketNamespace.ARTICLES)
      .on(SocketEvent.CONNECTION, this.articlesHandler);

    this.io
      .of(SocketNamespace.COMMENTS)
      .on(SocketEvent.CONNECTION, this.commentsHandler);

    this.io
      .of(SocketNamespace.REACTIONS)
      .on(SocketEvent.CONNECTION, this.reactionsHandler);
  };

  private articlesHandler = (socket: Socket): void => {
    socket.on(SocketEvent.ARTICLES_JOIN_ROOM, (roomId: string) => {
      void socket.join(roomId);
    });

    socket.on(SocketEvent.ARTICLES_LEAVE_ROOM, (roomId: string) => {
      void socket.leave(roomId);
    });
  };

  private commentsHandler = (socket: Socket): void => {
    socket.on(SocketEvent.COMMENTS_JOIN_ROOM, (roomId: string) => {
      void socket.join(roomId);
    });

    socket.on(SocketEvent.COMMENTS_LEAVE_ROOM, (roomId: string) => {
      void socket.leave(roomId);
    });
  };

  private reactionsHandler = (socket: Socket): void => {
    socket.on(SocketEvent.REACTIONS_JOIN_ROOM, (roomId: string) => {
      void socket.join(roomId);
    });

    socket.on(SocketEvent.REACTIONS_LEAVE_ROOM, (roomId: string) => {
      void socket.leave(roomId);
    });
  };
}

export { SocketService };
