import { config } from '~/libs/packages/config/config.js';
import { FileApi } from '~/libs/packages/file/file-api.package.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

const fileApi = new FileApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { fileApi };
export { FilesApiPath } from './libs/enums/enums.js';
export { type FileUploadResponseDto } from './libs/types/types.js';
