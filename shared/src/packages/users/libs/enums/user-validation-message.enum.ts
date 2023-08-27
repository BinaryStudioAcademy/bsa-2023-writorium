import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
  EMAIL_REQUIRE: 'The email is required',
  EMAIL_WRONG: 'Please, enter a correct email',
  PASSWORD_REQUIRE: 'The password is required',
  PASSWORD_LENGTH: `Your password must be at ${UserValidationRule.PASSWORD_MIN_LENGTH}-${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
  PASSWORD_WRONG: 'Please, enter a correct password',
  FIRST_NAME_REQUIRE: 'The first name is required',
  LAST_NAME_REQUIRE: 'The last name is required',
  LAST_NAME_WRONG: 'Please, enter a valid last name',
  FIRST_NAME_WRONG: 'Please, enter a valid first name',
} as const;

export { UserValidationMessage };
