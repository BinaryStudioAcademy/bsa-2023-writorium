import {
  type GenerateArticlePromptResponseDto as GeneratedPrompt,
  type PromptRequestDto,
} from '~/packages/prompts/prompts.js';
import { getGeneratedPromptPayload } from '~/packages/prompts/prompts.js';

import { type PromptConfirmationFormValues } from '../types/types.js';

const getConfirmedPrompts = (
  prompt: GeneratedPrompt,
  confirmedPrompt: PromptConfirmationFormValues,
): PromptRequestDto | null => {
  return getGeneratedPromptPayload(
    Object.entries(prompt).reduce<GeneratedPrompt>((resultPrompt, [key]) => {
      const castedKey = key as keyof typeof prompt;
      if (castedKey !== 'genre' && !confirmedPrompt[castedKey]) {
        return {
          ...resultPrompt,
          [key]: null,
        };
      }
      return resultPrompt;
    }, prompt),
  );
};

export { getConfirmedPrompts };
