import { OpenAI as OpenAIClient } from 'openai';
import { type CompletionCreateParamsBase } from 'openai/resources/chat/completions.js';

import { type IConfig } from '../config/config.js';
import { type CompletionConfig } from './libs/types/completion-config.type.js';

class OpenAIService {
  private config: IConfig;
  private openAIClient: OpenAIClient;

  private DEFAULT_COMPLETION_MODEL: CompletionCreateParamsBase['model'] =
    'gpt-3.5-turbo';
  private DEFAULT_TEMPERATURE = 0;

  public constructor(config: IConfig) {
    this.config = config;

    this.openAIClient = new OpenAIClient({
      apiKey: this.config.ENV.OPEN_AI.API_KEY,
    });
  }

  public async createCompletion({
    prompt,
    maxTokens,
    frequencyPenalty,
    model = this.DEFAULT_COMPLETION_MODEL,
    temperature = this.DEFAULT_TEMPERATURE,
  }: CompletionConfig): Promise<string | null> {
    const modelResponse = await this.openAIClient.chat.completions.create({
      model,
      temperature,
      max_tokens: maxTokens,
      frequency_penalty: frequencyPenalty,
      messages: [
        {
          'role': 'user',
          'content': prompt,
        },
      ],
    });

    const [modelChoice] = modelResponse.choices;
    return modelChoice?.message.content ?? null;
  }
}

export { OpenAIService };
