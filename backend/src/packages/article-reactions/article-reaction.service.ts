import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';

import { ArticleReactionEntity } from './article-reaction.entity.js';
import { type ArticleReactionRepository } from './article-reaction.repository.js';
import {
  type ArticleReactionCreateDto,
  type ArticleReactionRequestDto,
  type ArticleReactionResponseDto,
} from './libs/types/types.js';

class ArticleReactionService implements IService {
  private articleReactionRepository: ArticleReactionRepository;

  public constructor(articleReactionRepository: ArticleReactionRepository) {
    this.articleReactionRepository = articleReactionRepository;
  }

  public findAll(): Promise<{ items: unknown[] }> {
    return Promise.resolve({ items: [] });
  }

  public async find(id: number): Promise<ArticleReactionResponseDto | null> {
    const reaction = await this.articleReactionRepository.find(id);

    if (!reaction) {
      return null;
    }

    return reaction.toObject();
  }

  public async create(
    payload: ArticleReactionCreateDto,
  ): Promise<ArticleReactionResponseDto> {
    const reaction = await this.articleReactionRepository.create(
      ArticleReactionEntity.initializeNew({
        ...payload,
      }),
    );

    return reaction.toObject();
  }

  public async update(
    userId: number,
    payload: ArticleReactionRequestDto,
  ): Promise<ArticleReactionResponseDto> {
    const { articleId, isLike } = payload;
    const reactionEntity =
      await this.articleReactionRepository.findArticleReaction(
        userId,
        articleId,
      );

    if (!reactionEntity) {
      return await this.create({ isLike, userId, articleId });
    }

    const reaction = reactionEntity.toObject();

    if (reaction.isLike === isLike) {
      return await this.delete(reaction.id);
    }

    const updatedReaction = await this.articleReactionRepository.update(
      ArticleReactionEntity.initialize({
        ...reaction,
        isLike,
      }),
    );

    return updatedReaction.toObject();
  }

  public async delete(id: number): Promise<ArticleReactionResponseDto> {
    const deletedReaction = await this.articleReactionRepository.delete(id);

    if (!deletedReaction) {
      throw new ApplicationError({
        message: `Failed to delete reaction with ID ${id}`,
      });
    }

    return deletedReaction.toObject();
  }
}

export { ArticleReactionService };
