const UserValidationRule = {
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
  EMAIL_PATTERN:
    /^[\d!#$%&'*+/=?^_`a-z{|}~-]+(?:\.[\d!#$%&'*+/=?^_`a-z{|}~-]+)*@(?:[\da-z](?:[\da-z-]*[\da-z])?\.)+[\da-z](?:[\da-z-]*[\da-z])?$/,
  PASSWORD_PATTERN: /^[\w!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~”-]*$/,
  NAME_PATTERN: /^[A-Za-z]+$/,
} as const;

export { UserValidationRule };
