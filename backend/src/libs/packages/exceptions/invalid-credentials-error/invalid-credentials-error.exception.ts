import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class InvalidCredentialsError extends HttpError {
  public constructor() {
    super({
      message: 'Login failed. Invalid Email or Password',
      status: HttpCode.BAD_REQUEST,
    });
  }
}

export { InvalidCredentialsError };
