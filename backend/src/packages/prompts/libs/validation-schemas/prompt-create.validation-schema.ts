import joi from 'joi';

import { PromptType } from '~/packages/prompts/libs/enums/enums.js';
import { type PromptRequestDto } from '~/packages/prompts/libs/types/types.js';

const promptCreate = joi.object<PromptRequestDto, true>({
  character: joi.string().required().allow(null),
  setting: joi.string().required().allow(null),
  situation: joi.string().required().allow(null),
  prop: joi.string().required().allow(null),
  type: joi.string().valid(PromptType.DAILY, PromptType.MANUAL).required(),
  genre: joi.string().required(),
});

export { promptCreate };
