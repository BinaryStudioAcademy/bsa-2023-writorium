import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';

import { ArticleReactionEntity } from './article-reaction.entity.js';
import { type ArticleReactionRepository } from './article-reaction.repository.js';
import {
  type ArticleReactionCreateDto,
  type ArticleReactionEntityType,
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

  public async find(id: number): Promise<ArticleReactionEntityType | null> {
    const reaction = await this.articleReactionRepository.find(id);

    if (!reaction) {
      return null;
    }

    return reaction.toObject();
  }

  public async create(
    payload: ArticleReactionCreateDto,
  ): Promise<ArticleReactionResponseDto> {
    await this.articleReactionRepository.create(
      ArticleReactionEntity.initializeNew({
        ...payload,
      }),
    );

    return await this.articleReactionRepository.findAllByArticleId(
      payload.articleId,
    );
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
      throw new ApplicationError({
        message: `Reaction for article with ID ${articleId} not found`,
      });
    }

    const reaction = reactionEntity.toObject();

    await (reaction.isLike === isLike
      ? this.articleReactionRepository.delete(reaction.id)
      : this.articleReactionRepository.update(
          ArticleReactionEntity.initialize({
            ...reaction,
            isLike,
          }),
        ));

    return await this.articleReactionRepository.findAllByArticleId(articleId);
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleReactionService };
