import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

class FailedToGeneratePromptError extends HttpError {
  public constructor() {
    super({
      message: 'Failed to generate prompt',
      status: HttpCode.INTERNAL_SERVER_ERROR,
    });
  }
}

export { FailedToGeneratePromptError };
