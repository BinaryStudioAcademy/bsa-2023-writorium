import joi from 'joi';

import { CommentValidationMessage } from '~/packages/comments/libs/enums/enums.js';
import { type CommentUpdateRequestDto } from '~/packages/comments/libs/types/types.js';

const commentUpdate = joi.object<CommentUpdateRequestDto, true>({
  text: joi.string().trim(),
  publishedAt: joi.string().isoDate().allow(null).messages({
    'string.isoDate': CommentValidationMessage.COMMENT_PUBLISHED_ISO_DATE,
  }),
});

export { commentUpdate };
