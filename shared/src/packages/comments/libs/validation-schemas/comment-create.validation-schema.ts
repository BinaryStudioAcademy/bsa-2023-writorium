import joi from 'joi';

import { CommentValidationMessage } from '~/packages/comments/libs/enums/enums.js';
import { type CommentBaseRequestDto } from '~/packages/comments/libs/types/types.js';

const commentCreate = joi.object<CommentBaseRequestDto, true>({
  text: joi.string().trim().required().messages({
    'string.empty': CommentValidationMessage.COMMENT_TEXT_REQUIRE,
  }),
  articleId: joi.number().integer().positive(),
  publishedAt: joi.string().isoDate().required().allow(null).messages({
    'string.isoDate': CommentValidationMessage.COMMENT_PUBLISHED_ISO_DATE,
  }),
});

export { commentCreate };
