import joi from 'joi';

import { UserValidationMessage } from '~/packages/users/libs/enums/user-validation-message.enum.js';
import { UserValidationRule } from '~/packages/users/libs/enums/user-validation-rule.enum.js';
import { type UserUpdateRequestDto } from '~/packages/users/libs/types/user-update-request-dto.type.js';

const userUpdateWithAvatar = joi.object<UserUpdateRequestDto, true>({
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
  avatarId: joi.number().integer().positive().required().allow(null),
});

export { userUpdateWithAvatar };
