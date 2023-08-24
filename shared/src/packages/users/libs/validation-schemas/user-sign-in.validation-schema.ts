import joi from 'joi';

import { UserValidationMessage } from '../enums/enums.js';
import { type UserSignInRequestDto } from '../types/types.js';

const userSignIn = joi.object<UserSignInRequestDto, true>({
  email: joi
    .string()
    .trim()
    .regex(/^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/)
    .required()
    .messages({
      'string.pattern.base': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: joi.string().trim().min(4).max(20).required().messages({
    'string.min': UserValidationMessage.PASSWORD_LENGTH,
    'string.max': UserValidationMessage.PASSWORD_LENGTH,
    'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
  }),
});

export { userSignIn };
