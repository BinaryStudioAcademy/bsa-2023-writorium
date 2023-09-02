import joi from 'joi';

import { type CommentUpdateRequestDto } from '~/packages/comments/libs/types/types.js';

import { CommentValidationMessage } from '../enums/enums.js';

const commentUpdate = joi.object<CommentUpdateRequestDto, true>({
  text: joi.string().trim().required().messages({
    'string.empty': CommentValidationMessage.COMMENT_TEXT_REQUIRE,
  }),
});

export { commentUpdate };
