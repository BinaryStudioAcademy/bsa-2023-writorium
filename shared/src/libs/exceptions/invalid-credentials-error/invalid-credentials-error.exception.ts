import { ServerErrorType } from '../../enums/enums.js';
import { ApplicationError } from '../exceptions.js';

class InvalidCredentialsError extends ApplicationError {
  public constructor(message: string) {
    super({ message });
    this.name = ServerErrorType.INVALID_CREDENTIALS;
  }
}

export { InvalidCredentialsError };
