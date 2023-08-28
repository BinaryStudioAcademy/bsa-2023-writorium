import { OpenAI as OpenAIClient } from 'openai';

import { type IConfig } from '../config/config.js';
import { type CompletionConfig } from './libs/types/completion-config.type.js';

class OpenAIService {
  private config: IConfig;
  private openAIClient: OpenAIClient;

  private DEFAULT_COMPLETION_MODEL = 'gpt-3.5-turbo';
  private DEFAULT_TEMPERATURE = 1.2;
  private DEFAULT_MAX_TOKENS = 256;

  public constructor(config: IConfig) {
    this.config = config;

    this.openAIClient = new OpenAIClient({
      apiKey: this.config.ENV.OPEN_AI.API_KEY,
    });
  }

  public async createCompletion({
    prompt,
    model = this.DEFAULT_COMPLETION_MODEL,
    temperature = this.DEFAULT_TEMPERATURE,
    maxTokens = this.DEFAULT_MAX_TOKENS,
  }: CompletionConfig): Promise<string | null | undefined> {
    const modelResponse = await this.openAIClient.chat.completions.create({
      model,
      temperature,
      max_tokens: maxTokens,
      messages: [
        {
          'role': 'system',
          'content': prompt,
        },
      ],
    });

    return modelResponse.choices.pop()?.message.content;
  }
}

export { OpenAIService };
