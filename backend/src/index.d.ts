import { type SocketServer } from './libs/packages/socket/socket.js';
import {
  type FileToUpload,
  type FileUploadDecoratedProperty,
} from './libs/plugins/file-upload/file-upload.js';
import { type SocketInjectorDecoratedProperty } from './libs/plugins/socket-injector/socket-injector.js';
import { type UserAuthResponseDto } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAuthResponseDto;
    [FileUploadDecoratedProperty.FILE_TO_UPLOAD]: FileToUpload | null;
    [SocketInjectorDecoratedProperty.IO]: SocketServer;
  }
}
