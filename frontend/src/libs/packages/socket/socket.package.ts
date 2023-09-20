import { type Socket as SocketType } from 'socket.io-client';
import { io } from 'socket.io-client';

class Socket {
  public getInstance = (namespace: string, userId: number): SocketType => {
    return io(namespace, {
      transports: ['websocket'],
      query: {
        userId,
      },
    });
  };
}

export { Socket };
