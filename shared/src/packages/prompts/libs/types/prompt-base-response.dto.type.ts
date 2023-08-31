import { type PromptCategory } from '~/packages/prompts/libs/enums/prompt-category.enum.js';

type PromptBaseResponseDto = {
  [PromptCategory.GENRE]: string;
  [PromptCategory.CHARACTER]: string;
  [PromptCategory.SETTING]: string;
  [PromptCategory.SITUATION]: string;
  [PromptCategory.PROP]: string;
};

export { type PromptBaseResponseDto };
