import { type GenerateArticlePromptResponseDto as GeneratedPrompt } from '~/packages/prompts/prompts.js';

import { type WithNewTypeOfKeys } from '../types/types.js';

const DEFAULT_FORM_PAYLOAD: WithNewTypeOfKeys<
  Omit<GeneratedPrompt, 'genre'>,
  boolean
> = {
  character: true,
  setting: true,
  situation: true,
  prop: true,
};

export { DEFAULT_FORM_PAYLOAD };
