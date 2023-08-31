import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/users.js';

import { type AuthResetPasswordDto } from '../types/types.js';

const resetPassword = joi.object<AuthResetPasswordDto, true>({
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
  confirmPassword: joi
    .string()
    .equal(joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),

  resetPasswordToken: joi.string().trim().required(),
});

export { resetPassword };
