import { type IRepository } from '~/libs/interfaces/interfaces.js';

import { ArticleReactionEntity } from './article-reaction.entity.js';
import { type ArticleReactionModel } from './article-reaction.model.js';

class ArticleReactionRepository implements IRepository {
  private articleReactionModel: typeof ArticleReactionModel;

  public constructor(articleReactionModel: typeof ArticleReactionModel) {
    this.articleReactionModel = articleReactionModel;
  }

  public findAll(): ReturnType<IRepository['findAll']> {
    return Promise.resolve([]);
  }

  public async find(id: number): Promise<ArticleReactionEntity | null> {
    const reaction = await this.articleReactionModel
      .query()
      .findById(id)
      .execute();

    if (!reaction) {
      return null;
    }

    return ArticleReactionEntity.initialize(reaction);
  }

  public async findArticleReaction(
    userId: number,
    articleId: number,
  ): Promise<ArticleReactionEntity | null> {
    const reaction = await this.articleReactionModel
      .query()
      .where('userId', userId)
      .andWhere('articleId', articleId)
      .first()
      .execute();

    if (!reaction) {
      return null;
    }

    return ArticleReactionEntity.initialize(reaction);
  }

  public async create(
    entity: ArticleReactionEntity,
  ): Promise<ArticleReactionEntity> {
    const { isLike, userId, articleId } = entity.toNewObject();

    const reaction = await this.articleReactionModel
      .query()
      .insert({
        isLike,
        userId,
        articleId,
      })
      .returning('*')
      .execute();

    return ArticleReactionEntity.initialize(reaction);
  }

  public async update(
    entity: ArticleReactionEntity,
  ): Promise<ArticleReactionEntity> {
    const { id, ...payload } = entity.toObject();

    const updatedReaction = await this.articleReactionModel
      .query()
      .patchAndFetchById(id, payload)
      .execute();

    return ArticleReactionEntity.initialize(updatedReaction);
  }

  public async delete(id: number): Promise<ArticleReactionEntity | null> {
    const deletedReaction = await this.articleReactionModel
      .query()
      .deleteById(id)
      .returning('*')
      .first()
      .execute();

    if (!deletedReaction) {
      return null;
    }

    return ArticleReactionEntity.initialize(deletedReaction);
  }
}

export { ArticleReactionRepository };
