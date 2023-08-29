import joi from 'joi';

import { CommentValidationMessage } from '~/packages/comments/libs/enums/enums.js';
import { type CommentRequestDto } from '~/packages/comments/libs/types/types.js';

const commentUpdate = joi.object<CommentRequestDto, true>({
  text: joi.string().trim(),
  articleId: joi.number().integer().positive(),
  publishedAt: joi.string().isoDate().allow(null).messages({
    'string.isoDate': CommentValidationMessage.COMMENT_PUBLISHED_ISO_DATE,
  }),
});

export { commentUpdate };
