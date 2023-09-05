import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class EmailFailedToSendError extends HttpError {
  public constructor() {
    super({
      message: 'Email failed to send',
      status: HttpCode.NOT_FOUND,
    });
  }
}

export { EmailFailedToSendError };
