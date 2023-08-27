import {
  type FileToUpload,
  type FileUploadDecoratedPropety,
} from './libs/plugins/file-upload/file-upload.js';
import { type UserAuthResponseDto } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAuthResponseDto;
    [FileUploadDecoratedPropety.FILE_TO_UPLOAD]: FileToUpload | null;
  }
}
