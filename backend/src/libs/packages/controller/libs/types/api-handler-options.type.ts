import { type FileToUpload } from '~/libs/plugins/file-upload/libs/types/types.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  fileToUpload?: FileToUpload | null;
  user?: UserAuthResponseDto | null;
  origin?: string;
  host?: string;
  sharedArticleToken?: string;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  fileToUpload: T['fileToUpload'];
  user: T['user'];
  origin: T['origin'];
  host: T['host'];
  sharedArticleToken: T['sharedArticleToken'];
};

export { type ApiHandlerOptions };
