class InvalidCredentialsError extends Error {
  public constructor(message = 'Incorrect email or password') {
    super(message);
    this.name = 'InvalidCredentials';
  }
}

export { InvalidCredentialsError };
