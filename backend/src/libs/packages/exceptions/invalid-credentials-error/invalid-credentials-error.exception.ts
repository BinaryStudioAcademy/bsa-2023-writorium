class InvalidCredentialsError extends Error {
  public constructor(message = 'Login failed. Invalid Email or Password') {
    super(message);
    this.name = 'InvalidCredentials';
  }
}

export { InvalidCredentialsError };
