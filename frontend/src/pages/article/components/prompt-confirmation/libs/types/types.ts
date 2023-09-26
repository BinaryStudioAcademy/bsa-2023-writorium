import { type GenerateArticlePromptResponseDto as GeneratedPrompt } from '~/packages/prompts/prompts.js';

type WithNewTypeOfKeys<T extends object, NewType> = {
  [key in keyof T]: NewType;
};

type PromptConfirmationFormValues = WithNewTypeOfKeys<
  Omit<GeneratedPrompt, 'genre'>,
  boolean
>;

export { type PromptConfirmationFormValues, type WithNewTypeOfKeys };
