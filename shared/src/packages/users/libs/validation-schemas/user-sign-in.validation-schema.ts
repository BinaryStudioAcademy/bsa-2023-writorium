import joi from 'joi';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
  email: joi
    .string()
    .trim()
    .regex(UserValidationRule.PASSWORD_PATTERN)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: joi
    .string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.min': UserValidationMessage.PASSWORD_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_LENGTH,
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
    }),
});

export { userSignIn };
