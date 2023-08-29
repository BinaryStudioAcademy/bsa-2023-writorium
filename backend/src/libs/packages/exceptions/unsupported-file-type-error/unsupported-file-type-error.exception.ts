import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class UnsupportedFileTypeError extends HttpError {
  public constructor() {
    super({
      message: 'Unsupported file type',
      status: HttpCode.UNSUPPORTED_MEDIA_TYPE,
    });
  }
}

export { UnsupportedFileTypeError };
