import { SocketService } from './socket.package.js';

const socketService = new SocketService();

export { socketService };
export { SocketNamespace, SocketRoom } from './libs/enums/enums.js';
export { SocketServer } from './libs/types/types.js';
export { type SocketService } from './socket.package.js';
