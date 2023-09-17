import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

const customPasswordCharactersValidator = (
  value: string,
  helpers: joi.CustomHelpers<string>,
): string | joi.ErrorReport => {
  const isValid = UserValidationRule.PASSWORD_CHARACTERS_PATTERN.test(value);

  if (!isValid) {
    return helpers.message({
      'custom': UserValidationMessage.PASSWORD_WRONG_CHARACTERS,
    });
  }

  return value;
};

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .trim()
    .email({
      tlds: {
        allow: false,
      },
    })
    .regex(UserValidationRule.EMAIL_PATTERN)
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: joi
    .string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .custom(customPasswordCharactersValidator, 'custom characters validation')
    .regex(UserValidationRule.PASSWORD_CONTENT_PATTERN)
    .required()
    .messages({
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': UserValidationMessage.PASSWORD_CONTENT_REQUIRE,
    }),
  firstName: joi
    .string()
    .trim()
    .min(UserValidationRule.NAME_MIN_LENGTH)
    .max(UserValidationRule.NAME_MAX_LENGTH)
    .regex(UserValidationRule.NAME_PATTERN)
    .required()
    .messages({
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
      'string.pattern.base': UserValidationMessage.FIRST_NAME_WRONG,
    })
    .label('first name'),
  lastName: joi
    .string()
    .trim()
    .required()
    .min(UserValidationRule.NAME_MIN_LENGTH)
    .max(UserValidationRule.NAME_MAX_LENGTH)
    .regex(UserValidationRule.NAME_PATTERN)
    .messages({
      'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
      'string.pattern.base': UserValidationMessage.LAST_NAME_WRONG,
    })
    .label('last name'),
});

export { userSignUp };
