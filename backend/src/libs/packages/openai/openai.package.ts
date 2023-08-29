import { OpenAI as OpenAIClient } from 'openai';

import { type IConfig } from '../config/config.js';
import { type CompletionConfig } from './libs/types/completion-config.type.js';

class OpenAIService {
  private config: IConfig;
  private openAIClient: OpenAIClient;

  private DEFAULT_COMPLETION_MODEL = 'gpt-3.5-turbo';
  private DEFAULT_TEMPERATURE = 1.5;
  private DEFAULT_MAX_TOKENS = 256;
  private DEFAULT_FREQUENCY_PENALTY = 0.5;

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
    frequencyPenalty = this.DEFAULT_FREQUENCY_PENALTY,
  }: CompletionConfig): Promise<string | null | undefined> {
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
    return modelChoice?.message.content;
  }
}

export { OpenAIService };
