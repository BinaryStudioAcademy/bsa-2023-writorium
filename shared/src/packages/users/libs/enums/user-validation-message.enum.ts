import { UserValidationRule } from './user-validation-rule.enum.js';

const UserValidationMessage = {
  EMAIL_REQUIRE: 'The email is required',
  EMAIL_WRONG: 'Please, enter a correct email',
  PASSWORD_REQUIRE: 'The password is required',
  PASSWORD_MIN_LENGTH: `The minimal password length - ${UserValidationRule.PASSWORD_MIN_LENGTH}`,
  PASSWORD_MAX_LENGTH: `The maximal password length - ${UserValidationRule.PASSWORD_MAX_LENGTH}`,
  PASSWORD_CONTENT_REQUIRE:
    'Password must contain at least one special character, one digit and one uppercase latin letter',
  PASSWORD_WRONG_CHARACTERS:
    'The Password field accepts lowercase latin letters, uppercase latin letters, digits, special characters',
  FIRST_NAME_REQUIRE: 'The first name is required',
  LAST_NAME_REQUIRE: 'The last name is required',
  LAST_NAME_WRONG:
    'The Last Name field accepts lowercase latin letters, uppercase latin letters, hyphen and space',
  FIRST_NAME_WRONG:
    'The First Name field accepts lowercase latin letters, uppercase latin letters, hyphen and space',
} as const;

export { UserValidationMessage };
