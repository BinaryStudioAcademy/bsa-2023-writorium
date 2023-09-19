import { Socket } from './socket.package.js';

const socket = new Socket();

export {
  CommentsSocketEvent,
  ReactionsSocketEvent,
  SocketEvent,
  SocketNamespace,
} from './libs/enums/enums.js';
export { socket };
