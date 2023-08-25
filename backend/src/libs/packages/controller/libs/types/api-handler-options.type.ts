import { type FileToUpload } from '~/libs/plugins/file-upload/libs/types/types.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  fileToUpload?: FileToUpload | null;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  fileToUpload: T['fileToUpload'];
};

export { type ApiHandlerOptions };
