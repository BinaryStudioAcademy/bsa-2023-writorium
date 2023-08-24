import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
  EMAIL_REQUIRE: 'This field is required',
  EMAIL_WRONG: 'Please, enter a correct email',
  PASSWORD_REQUIRE: 'This field is required',
  PASSWORD_LENGTH: `Your password must be at ${UserValidationRule.PASSWORD_MIN_LENGTH}-${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
} as const;

export { UserValidationMessage };
