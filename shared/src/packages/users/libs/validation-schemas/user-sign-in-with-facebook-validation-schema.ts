import joi from 'joi';

import { type UserSignInWithFacebookResponseDto } from '../types/types.js';

const userSignInWithFacebook = joi.object<
  UserSignInWithFacebookResponseDto,
  true
>({
  id: joi.string().trim().required(),
  userID: joi.string().trim().required(),
  accessToken: joi.string().trim().required(),
  name: joi.string().trim(),
  email: joi.string().trim(),
  picture: joi.object({
    data: joi.object({
      height: joi.number(),
      is_silhouette: joi.boolean(),
      url: joi.string(),
      width: joi.number(),
    }),
  }),
});

export { userSignInWithFacebook };
