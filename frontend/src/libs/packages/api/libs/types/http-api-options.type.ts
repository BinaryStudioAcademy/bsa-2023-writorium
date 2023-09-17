import { type ContentType } from '~/libs/enums/enums.js';
import {
  type CustomHttpHeader,
  type HttpOptions,
} from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
  hasAuth: boolean;
  contentType?: ValueOf<typeof ContentType>;
  payload?: HttpOptions['payload'];
  query?: Record<string, unknown>;
  customHeaders?: Record<ValueOf<typeof CustomHttpHeader>, string>;
};

export { type HttpApiOptions };
