import { type Socket as SocketType } from 'socket.io-client';
import { io } from 'socket.io-client';

class Socket {
  public getInstance = (namespace: string): SocketType => {
    return io(namespace, {
      transports: ['websocket'],
    });
  };
}

export { Socket };
