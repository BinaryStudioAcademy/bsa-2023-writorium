import { Socket } from './socket.package.js';

const socket = new Socket();

export {
  SocketEvent,
  SocketNamespace,
  SocketRoom,
} from './libs/enums/enums.js';
export { socket };
