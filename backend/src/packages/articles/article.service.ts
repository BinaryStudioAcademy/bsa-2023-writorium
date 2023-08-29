import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import {
  convertPlainStringToSnakeCase,
  safeJSONParse,
} from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';

import { GenreEntity } from '../genres/genre.entity.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import { getDetectArticleGenrePrompt } from './libs/helpers/get-detect-article-genre-prompt.helper.js';
import {
  type ArticleBaseResponseDto,
  type ArticleCreateDto,
  type ArticleUpdateRequestDto,
} from './libs/types/types.js';

class ArticleService implements IService {
  private articleRepository: ArticleRepository;
  private openAIService: OpenAIService;
  private genreRepository: GenreRepository;

  public constructor(
    articleRepository: ArticleRepository,
    openAIService: OpenAIService,
    genreRepository: GenreRepository,
  ) {
    this.articleRepository = articleRepository;
    this.openAIService = openAIService;
    this.genreRepository = genreRepository;
  }

  public async detectArticleGenreFromText(
    text: string,
  ): Promise<string | null> {
    const generesJSON = await this.openAIService.createCompletion({
      temperature: 0,
      prompt: getDetectArticleGenrePrompt(text),
    });

    if (!generesJSON) {
      return null;
    }

    const parsedGenres = safeJSONParse<string[]>(generesJSON);

    return parsedGenres?.[0] ?? null;
  }

  private async getGenreIdForArticle(
    articleText: string,
  ): Promise<number | null> {
    const detectedGenre = await this.detectArticleGenreFromText(articleText);

    if (!detectedGenre) {
      return null;
    }

    const existingGenre = await this.genreRepository.findByKey(
      convertPlainStringToSnakeCase(detectedGenre),
    );

    if (existingGenre) {
      return existingGenre.toObject().id;
    } else {
      const newGenreEntity = await this.genreRepository.create(
        GenreEntity.initializeNew({
          name: detectedGenre,
          key: convertPlainStringToSnakeCase(detectedGenre),
        }),
      );

      return newGenreEntity.toObject().id;
    }
  }

  public findAll(): Promise<{ items: unknown[] }> {
    return Promise.resolve({ items: [] });
  }

  public async find(id: number): Promise<ArticleBaseResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    return article.toObject();
  }

  public async create(
    payload: ArticleCreateDto,
  ): Promise<ArticleBaseResponseDto> {
    const genreId = await this.getGenreIdForArticle(payload.text);

    const article = await this.articleRepository.create(
      ArticleEntity.initializeNew({
        genreId,
        title: payload.title,
        text: payload.text,
        userId: payload.userId,
        promptId: payload?.promptId ?? null,
        publishedAt: payload?.publishedAt ?? null,
      }),
    );

    return article.toObject();
  }

  public async update(
    id: number,
    payload: ArticleUpdateRequestDto,
  ): Promise<ArticleBaseResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new ApplicationError({
        message: `Article with id ${id} not found`,
      });
    }

    const updatedArticle = await this.articleRepository.update(
      ArticleEntity.initialize({
        ...article,
        ...payload,
      }),
    );

    return updatedArticle.toObject();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleService };
