import { type HttpApiOptions } from '../types/types.js';

interface IHttpApi {
  load(path: string, options: HttpApiOptions): Promise<Response>;
}

export { type IHttpApi };
