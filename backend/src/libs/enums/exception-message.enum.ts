const ExceptionMessage = {
  EMAIL_IS_ALREADY_USED: 'An account using this email already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Login failed. Invalid Email or Password',
  INVALID_TOKEN: 'Invalid token',
  INVALID_CODE: 'Invalid code',
  INVALID_USER_INFO_NO_EMAIL: 'Invalid user info format: no email',
  FAILED_TO_GENERATE_PROMPT: 'Failed to generate prompt',
  UNKNOWN_ERROR: 'Unknown error',
  UNABLE_TO_DECODE_USER_INFO: 'Unable to decode user info!',
  UNSPECIFIED_REQUEST_ORIGIN: 'Unspecified request origin!',
  DO_NOT_HAVE_AUTHORIZATION:
    'You do not have the necessary authorization to access this resource. Please log in.',
  AUTHORIZATION_HEADER:
    'Authorization header should be in format: Bearer <token>',
  FAILED_TO_SEND_EMAIL: 'Failed to send email',
  FILE_NOT_PROVIDED: 'File not provided',
} as const;

export { ExceptionMessage };
