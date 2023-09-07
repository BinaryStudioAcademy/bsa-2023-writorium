import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class UnauthorizedError extends HttpError {
  public constructor(message: string) {
    super({ message, status: HttpCode.UNAUTHORIZED });
  }
}

export { UnauthorizedError };
