import { MAX_FILE_SIZE_MB } from '~/libs/packages/file/file.package.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class FileSizeLimitExceededError extends HttpError {
  public constructor() {
    super({
      message: `The selected file exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} Mb`,
      status: HttpCode.CONTENT_TOO_LARGE,
    });
  }
}

export { FileSizeLimitExceededError };
