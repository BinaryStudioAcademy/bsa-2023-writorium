import joi from 'joi';

import { type AuthLoginWithGoogleDto } from '../types/types.js';

const loginWithGoogle = joi.object<AuthLoginWithGoogleDto, true>({
  code: joi
    .string()
    .trim()
    .required()
    .messages({ 'string.empty': 'Code is required' }),
});

export { loginWithGoogle };
