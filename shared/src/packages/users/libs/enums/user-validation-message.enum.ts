import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
  EMAIL_REQUIRE: 'The email is required',
  EMAIL_WRONG: 'Please, enter a correct email',
  PASSWORD_REQUIRE: 'The password is required',
  PASSWORD_MIN_LENGTH: `The minimal password length - ${UserValidationRule.PASSWORD_MIN_LENGTH}`,
  PASSWORD_MAX_LENGTH: `The maximal password length - ${UserValidationRule.PASSWORD_MAX_LENGTH}`,
  PASSWORD_WRONG:
    'Password must contain at least one special character, one digit and one uppercase latin letter',
  FIRST_NAME_REQUIRE: 'The first name is required',
  LAST_NAME_REQUIRE: 'The last name is required',
  LAST_NAME_WRONG: 'Please, enter a valid last name',
  FIRST_NAME_WRONG: 'Please, enter a valid first name',
} as const;

export { UserValidationMessage };
