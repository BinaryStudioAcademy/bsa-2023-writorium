type Constructor = {
  message: string;
  cause?: unknown;
};

class NotFoundError extends Error {
  public constructor({ message, cause }: Constructor) {
    super(message, {
      cause,
    });
  }
}

export { NotFoundError };
