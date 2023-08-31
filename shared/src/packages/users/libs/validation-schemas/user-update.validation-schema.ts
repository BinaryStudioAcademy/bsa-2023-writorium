import joi from 'joi';

import {
  UserValidationMessage,
  UserValidationRule,
} from '~/packages/users/libs/enums/enums.js';
import { type UserUpdateRequestDto } from '~/packages/users/libs/types/types.js';

const userUpdate = joi.object<UserUpdateRequestDto, true>({
  firstName: joi
    .string()
    .trim()
    .required()
    .regex(UserValidationRule.NAME_PATTERN)
    .messages({
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
      'string.pattern.base': UserValidationMessage.FIRST_NAME_WRONG,
    }),
  lastName: joi
    .string()
    .trim()
    .required()
    .regex(UserValidationRule.NAME_PATTERN)
    .messages({
      'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
      'string.pattern.base': UserValidationMessage.LAST_NAME_WRONG,
    }),
  email: joi
    .string()
    .trim()
    .regex(UserValidationRule.EMAIL_PATTERN)
    .email({
      tlds: {
        allow: false,
      },
    })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  avatarId: joi.number().integer().required().allow(null),
});

export { userUpdate };
