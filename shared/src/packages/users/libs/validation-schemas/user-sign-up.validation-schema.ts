import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserSignUpRequestDto } from '../types/types.js';

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
    .regex(UserValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.min': UserValidationMessage.PASSWORD_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_LENGTH,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.pattern.base': UserValidationMessage.PASSWORD_WRONG,
    }),
  firstName: joi
    .string()
    .trim()
    .required()
    .regex(UserValidationRule.NAME_PATTERN)
    .messages({
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
      'string.pattern.base': UserValidationMessage.FIRST_NAME_WRONG,
    })
    .label('first name'),
  lastName: joi
    .string()
    .trim()
    .required()
    .regex(UserValidationRule.NAME_PATTERN)
    .messages({
      'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
      'string.pattern.base': UserValidationMessage.LAST_NAME_WRONG,
    })
    .label('last name'),
});

export { userSignUp };
