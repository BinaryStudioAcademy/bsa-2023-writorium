import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

type Constructor = {
  message?: string;
  limit?: number;
};

class FileSizeLimitExceededError extends HttpError {
  public constructor({
    limit,
    message = 'File size limit exceeded',
  }: Constructor = {}) {
    super({ message, status: HttpCode.CONTENT_TOO_LARGE });

    if (limit) {
      this.message = `File size limit of ${limit}MB exceeded`;
    }
  }
}

export { FileSizeLimitExceededError };
