import { ExceptionMessage } from '~/libs/enums/enums.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class UnsupportedFileTypeError extends HttpError {
  public constructor() {
    super({
      message: ExceptionMessage.UNSUPPORTED_FILE_TYPE,
      status: HttpCode.UNSUPPORTED_MEDIA_TYPE,
    });
  }
}

export { UnsupportedFileTypeError };
