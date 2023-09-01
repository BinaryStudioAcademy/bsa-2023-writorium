import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class FileSizeLimitExceededError extends HttpError {
  public constructor() {
    super({
      message: 'File size limit exceeded',
      status: HttpCode.CONTENT_TOO_LARGE,
    });
  }
}

export { FileSizeLimitExceededError };
