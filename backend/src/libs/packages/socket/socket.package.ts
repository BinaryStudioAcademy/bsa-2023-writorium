import { type default as Fastify } from 'fastify';
import { Server as SocketServer } from 'socket.io';

class SocketService {
  private '_io': SocketServer;

  public get io(): SocketServer {
    return this._io;
  }

  public initializeIo = (
    server: ReturnType<typeof Fastify>['server'],
  ): void => {
    this._io = new SocketServer(server);
  };
}

export { SocketService };
