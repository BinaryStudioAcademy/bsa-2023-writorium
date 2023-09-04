import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/users.js';

import { type AuthRequestPasswordDto } from '../types/types.js';

const requestPassword = joi.object<AuthRequestPasswordDto, true>({
  email: joi
    .string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .regex(UserValidationRule.EMAIL_PATTERN)
    .trim()
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
});

export { requestPassword };
