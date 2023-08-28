import { type CompletionCreateParamsBase } from 'openai/resources/completions';

type CompletionConfig = {
  prompt: string;
  model?: CompletionCreateParamsBase['model'];
  temperature?: number;
  maxTokens?: number;
};

export { type CompletionConfig };
