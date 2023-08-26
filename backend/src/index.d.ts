import { type FileUploadDecoratedPropety } from './libs/plugins/file-upload/libs/enums/enums.js';
import { type FileToUpload } from './libs/plugins/file-upload/libs/types/types.js';

declare module 'fastify' {
  interface FastifyRequest {
    [FileUploadDecoratedPropety.FILE_TO_UPLOAD]: FileToUpload | null;
  }
}
