import joi from 'joi';

import { type CommentUpdateRequestDto } from '~/packages/comments/libs/types/types.js';

const commentUpdate = joi.object<CommentUpdateRequestDto, true>({
  text: joi.string().trim(),
});

export { commentUpdate };
