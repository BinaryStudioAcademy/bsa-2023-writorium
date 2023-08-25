import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import {
  type ArticleCreateDto,
  type ArticleCreateResponseDto,
  type ArticleGetItemResponseDto,
  type ArticleUpdateRequestDto,
  type ArticleUpdateResponseDto,
} from './libs/types/types.js';

class ArticleService implements IService {
  private articleRepository: ArticleRepository;

  public constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  public findAll(): Promise<{ items: unknown[] }> {
    return Promise.resolve({ items: [] });
  }

  public async find(id: number): Promise<ArticleGetItemResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    return article.toObject();
  }

  public async create(
    payload: ArticleCreateDto,
  ): Promise<ArticleCreateResponseDto> {
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
  ): Promise<ArticleUpdateResponseDto> {
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
