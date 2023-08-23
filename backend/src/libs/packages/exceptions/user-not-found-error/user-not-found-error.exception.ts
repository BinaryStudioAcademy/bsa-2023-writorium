type Constructor = {
  message?: string;
  cause?: unknown;
};

class UserNotFoundError extends Error {
  public constructor({ message = 'User Not Found', cause }: Constructor = {}) {
    super(message, {
      cause,
    });
  }
}

export { UserNotFoundError };
