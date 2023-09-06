import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class NotFoundError extends HttpError {
  public constructor(message: string) {
    super({ message, status: HttpCode.NOT_FOUND });
  }
}

export { NotFoundError };
