import { type default as Fastify } from 'fastify';
import { type Socket } from 'socket.io';

import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { SocketServer } from './libs/types/types.js';

const Rooms = {
  ARTICLES: 'articles',
  REACTIONS: 'reactions',
  COMMENTS: 'comments',
} as const;

class SocketService {
  private '_io': SocketServer;

  private sockets = new Map<string, Socket>();

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
    ];

    const namespaceRoomsMapper = {
      [SocketNamespace.ARTICLES]: Rooms.ARTICLES,
      [SocketNamespace.COMMENTS]: Rooms.COMMENTS,
      [SocketNamespace.REACTIONS]: Rooms.REACTIONS,
    };

    for (const namespace of appNamespaces) {
      this.io
        .of(namespace)
        .on(SocketEvent.CONNECTION, (socket: Socket) =>
          this.handleNamespaceConnection(
            socket,
            namespaceRoomsMapper[namespace],
          ),
        );
    }
  };

  public getSocket(roomId: string): Socket | undefined {
    return this.sockets.get(roomId);
  }

  private handleNamespaceConnection = (
    socket: Socket,
    roomId: string,
  ): void => {
    socket.on(SocketEvent.JOIN_ROOM, (userId: number) => {
      void socket.join(roomId);
      this.sockets.set(userId.toString(), socket);
    });

    socket.on(SocketEvent.LEAVE_ROOM, (userId: number) => {
      void socket.leave(roomId);
      this.sockets.delete(userId.toString());
    });
  };
}

export { SocketService };
