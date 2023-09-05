import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class UserNotFoundError extends HttpError {
  public constructor() {
    super({ message: 'User Not Found', status: HttpCode.NOT_FOUND });
  }
}

export { UserNotFoundError };
