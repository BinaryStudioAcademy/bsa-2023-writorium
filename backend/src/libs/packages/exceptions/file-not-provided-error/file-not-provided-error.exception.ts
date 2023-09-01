import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class FileNotProvidedError extends HttpError {
  public constructor() {
    super({ message: 'File not provided', status: HttpCode.BAD_REQUEST });
  }
}

export { FileNotProvidedError };
