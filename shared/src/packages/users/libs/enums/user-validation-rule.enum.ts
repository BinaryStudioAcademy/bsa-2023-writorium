const UserValidationRule = {
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
  EMAIL_PATTERN: /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
} as const;

export { UserValidationRule };
