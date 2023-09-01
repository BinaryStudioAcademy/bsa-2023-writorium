const UserValidationRule = {
  PASSWORD_MIN_LENGTH: 4,
  PASSWORD_MAX_LENGTH: 20,
  EMAIL_PATTERN:
    /^(?=.{1,64}@.{1,255}$)[\w.-]+(?<!\.)(?<!\.\.)@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$/,
  PASSWORD_PATTERN:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%&()*+,.:;<=>?@[\]^_{}~-])[\w!#$%&()*+,.:;<=>?@^{}~-]$/,
  NAME_PATTERN: /^[ A-Za-z-]$/,
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 64,
} as const;

export { UserValidationRule };
