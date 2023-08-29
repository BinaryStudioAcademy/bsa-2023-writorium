import { type IService } from '~/libs/interfaces/interfaces.js';
import { FailedToGeneratePromptError } from '~/libs/packages/exceptions/exceptions.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';

import { ARTICLE_PROMPT_COMPLETION_MESSAGE } from './libs/constants/constants.js';
import {
  type GenerateArticlePromptResponseDto,
  type GeneratedArticlePrompt,
} from './libs/types/types.js';

class PromptService implements IService {
  private openAIService: OpenAIService;

  public constructor(openAIService: OpenAIService) {
    this.openAIService = openAIService;
  }

  private parsePromptJSON(promptJSON: string): GeneratedArticlePrompt {
    return JSON.parse(promptJSON) as GeneratedArticlePrompt;
  }

  public async generate(): Promise<GenerateArticlePromptResponseDto> {
    const promptJSON = await this.openAIService.createCompletion({
      prompt: ARTICLE_PROMPT_COMPLETION_MESSAGE,
    });

    if (!promptJSON) {
      throw new FailedToGeneratePromptError();
    }

    try {
      return this.parsePromptJSON(promptJSON);
    } catch {
      throw new FailedToGeneratePromptError();
    }
  }

  public find(): ReturnType<IService['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<IService['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public create(): ReturnType<IService['create']> {
    return Promise.resolve(null);
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { PromptService };
