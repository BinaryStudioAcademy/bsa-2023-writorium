import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { safeJSONParse } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';

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

  public constructor(
    articleRepository: ArticleRepository,
    openAIService: OpenAIService,
  ) {
    this.articleRepository = articleRepository;
    this.openAIService = openAIService;
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
    const article = await this.articleRepository.create(
      ArticleEntity.initializeNew({
        title: payload.title,
        text: payload.text,
        userId: payload.userId,
        promptId: payload?.promptId ?? null,
        genreId: payload.genreId,
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
