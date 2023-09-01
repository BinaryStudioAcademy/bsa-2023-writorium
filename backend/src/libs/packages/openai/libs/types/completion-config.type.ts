import { type CompletionCreateParamsBase } from 'openai/resources/chat/completions';

type CompletionConfig = {
  prompt: string;
  model?: CompletionCreateParamsBase['model'];
  temperature?: number;
  maxTokens?: number;
  frequencyPenalty?: number;
};

export { type CompletionConfig };
