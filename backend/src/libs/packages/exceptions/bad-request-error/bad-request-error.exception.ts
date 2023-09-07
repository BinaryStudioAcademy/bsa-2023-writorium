import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class BadRequestError extends HttpError {
  public constructor(message: string) {
    super({ message, status: HttpCode.BAD_REQUEST });
  }
}

export { BadRequestError };
