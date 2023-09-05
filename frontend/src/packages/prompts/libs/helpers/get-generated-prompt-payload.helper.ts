import {
  type GenerateArticlePromptResponseDto as GeneratedPrompt,
  type PromptRequestDto,
  PromptType,
} from '~/packages/prompts/prompts.js';

const getGeneratedPromptPayload = (
  generatedPrompt: GeneratedPrompt | null,
): PromptRequestDto | null => {
  if (!generatedPrompt) {
    return null;
  }

  return {
    type: PromptType.MANUAL,
    ...generatedPrompt,
  };
};

export { getGeneratedPromptPayload };
