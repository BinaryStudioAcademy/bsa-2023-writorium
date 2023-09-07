import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class InternalServerError extends HttpError {
  public constructor(message: string) {
    super({ message, status: HttpCode.INTERNAL_SERVER_ERROR });
  }
}

export { InternalServerError };
