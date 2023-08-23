import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserAuthRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserAuthRequestDto, true>({
  email: joi
    .string()
    .trim()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: joi.string().trim().required(),
});

export { userSignIn };
