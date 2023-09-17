import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { CommentEntity } from './comment.entity.js';
import { type CommentModel } from './comment.model.js';
import { SortingOrder } from './libs/enums/enums.js';

class CommentRepository implements IRepository {
  private commentModel: typeof CommentModel;

  private defaultRelationExpression = '[author.avatar]';

  public constructor(commentModel: typeof CommentModel) {
    this.commentModel = commentModel;
  }

  public findAll(): Promise<unknown[]> {
    return Promise.resolve([]);
  }

  public async findAllByArticleId(articleId: number): Promise<CommentEntity[]> {
    const comments = await this.commentModel
      .query()
      .where('articleId', articleId)
      .orderBy('comments.createdAt', SortingOrder.DESCENDING)
      .withGraphJoined(this.defaultRelationExpression)
      .execute();

    return comments.map((comment) =>
      CommentEntity.initialize({
        ...comment,
        author: {
          firstName: comment.author.firstName,
          lastName: comment.author.lastName,
          avatarUrl: comment.author.avatar?.url ?? null,
        },
      }),
    );
  }

  public async find(id: number): Promise<CommentEntity | null> {
    const comment = await this.commentModel
      .query()
      .findById(id)
      .withGraphJoined(this.defaultRelationExpression)
      .execute();

    if (!comment) {
      return null;
    }

    return CommentEntity.initialize({
      ...comment,
      author: {
        firstName: comment.author.firstName,
        lastName: comment.author.lastName,
        avatarUrl: comment.author.avatar?.url ?? null,
      },
    });
  }

  public async create(entity: CommentEntity): Promise<CommentEntity> {
    const { text, userId, articleId } = entity.toNewObject();

    const comment = await this.commentModel
      .query()
      .insert({
        text,
        userId,
        articleId,
      })
      .returning('*')
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return CommentEntity.initialize({
      ...comment,
      author: {
        firstName: comment.author.firstName,
        lastName: comment.author.lastName,
        avatarUrl: comment.author.avatar?.url ?? null,
      },
    });
  }

  public async update(entity: CommentEntity): Promise<CommentEntity> {
    const { id, ...payload } = entity.toObject();

    const comment = await this.commentModel
      .query()
      .patchAndFetchById(id, payload)
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return CommentEntity.initialize({
      ...comment,
      author: {
        firstName: comment.author.firstName,
        lastName: comment.author.lastName,
        avatarUrl: comment.author.avatar?.url ?? null,
      },
    });
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { CommentRepository };
