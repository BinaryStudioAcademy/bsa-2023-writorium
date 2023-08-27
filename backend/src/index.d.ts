import { type FileUploadDecoratedPropety } from './libs/plugins/file-upload/libs/enums/enums.js';
import { type FileToUpload } from './libs/plugins/file-upload/libs/types/types.js';
import { type UserAuthResponseDto } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAuthResponseDto;
    [FileUploadDecoratedPropety.FILE_TO_UPLOAD]: FileToUpload | null;
  }
}
