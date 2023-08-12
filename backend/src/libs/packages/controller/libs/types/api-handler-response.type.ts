import { type HttpCode } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type ApiHandlerResponse = {
  status: ValueOf<typeof HttpCode>;
  payload: unknown;
};

export { type ApiHandlerResponse };
