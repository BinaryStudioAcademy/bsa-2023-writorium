import {
  convertPlainStringToSnakeCase,
  safeJSONParse,
} from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { FailedToGeneratePromptError } from '~/libs/packages/exceptions/exceptions.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';

import { GenreEntity } from '../genres/genre.entity.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { ARTICLE_PROMPT_COMPLETION_MESSAGE } from './libs/constants/constants.js';
import {
  type GenerateArticlePromptResponseDto,
  type GeneratedArticlePrompt,
  type PromptBaseResponseDto,
  type PromptRequestDto,
} from './libs/types/types.js';
import { PromptEntity } from './prompt.entity.js';
import { type PromptRepository } from './prompt.repository.js';

class PromptService implements IService {
  private promptRepository: PromptRepository;
  private openAIService: OpenAIService;
  private genreRepository: GenreRepository;

  public constructor(
    promptRepository: PromptRepository,
    openAIService: OpenAIService,
    genreRepository: GenreRepository,
  ) {
    this.promptRepository = promptRepository;
    this.openAIService = openAIService;
    this.genreRepository = genreRepository;
  }

  public async generate(): Promise<GenerateArticlePromptResponseDto> {
    const promptJSON = await this.openAIService.createCompletion({
      prompt: ARTICLE_PROMPT_COMPLETION_MESSAGE,
    });

    if (!promptJSON) {
      throw new FailedToGeneratePromptError();
    }

    const parsedPrompt = safeJSONParse<GeneratedArticlePrompt>(promptJSON);

    if (!parsedPrompt) {
      throw new FailedToGeneratePromptError();
    }

    return parsedPrompt;
  }

  private async getGenreIdForPrompt(genre: string): Promise<number | null> {
    const genreKey = convertPlainStringToSnakeCase(genre);

    const existingGenre = await this.genreRepository.findByKey(genreKey);

    if (existingGenre) {
      return existingGenre.toObject().id;
    }

    const newGenreEntity = await this.genreRepository.create(
      GenreEntity.initializeNew({
        name: genre,
        key: genreKey,
      }),
    );

    return newGenreEntity.toObject().id;
  }

  public async find(id: number): Promise<PromptBaseResponseDto | null> {
    const prompt = await this.promptRepository.find(id);

    if (!prompt) {
      return null;
    }

    return prompt.toObject();
  }

  public findAll(): ReturnType<IService['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: PromptRequestDto,
  ): Promise<PromptBaseResponseDto> {
    const genreId = await this.getGenreIdForPrompt(payload.genre);

    const prompt = await this.promptRepository.create(
      PromptEntity.initializeNew({
        character: payload?.character ?? null,
        setting: payload?.setting ?? null,
        situation: payload?.situation ?? null,
        prop: payload?.prop ?? null,
        type: payload.type,
        genreId,
      }),
    );

    return prompt.toObject();
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { PromptService };
