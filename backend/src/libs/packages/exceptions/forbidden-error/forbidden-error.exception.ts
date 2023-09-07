import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class ForbiddenError extends HttpError {
  public constructor(message: string) {
    super({ message, status: HttpCode.FORBIDDEN });
  }
}

export { ForbiddenError };
