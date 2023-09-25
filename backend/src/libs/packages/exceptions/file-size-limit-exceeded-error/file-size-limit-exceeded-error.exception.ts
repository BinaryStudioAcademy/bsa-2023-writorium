import { ExceptionMessage } from '~/libs/enums/enums.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class FileSizeLimitExceededError extends HttpError {
  public constructor() {
    super({
      message: ExceptionMessage.FILE_SIZE_LIMIT_EXCEEDED,
      status: HttpCode.CONTENT_TOO_LARGE,
    });
  }
}

export { FileSizeLimitExceededError };
