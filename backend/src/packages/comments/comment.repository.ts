import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { CommentEntity } from './comment.entity.js';
import { type CommentModel } from './comment.model.js';

class CommentRepository implements IRepository {
  private commentModel: typeof CommentModel;

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
      .execute();

    return comments.map((it) => CommentEntity.initialize(it));
  }

  public async find(id: number): Promise<CommentEntity | null> {
    const comment = await this.commentModel.query().findById(id).execute();

    if (!comment) {
      return null;
    }

    return CommentEntity.initialize(comment);
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
      .execute();

    return CommentEntity.initialize(comment);
  }

  public async update(entity: CommentEntity): Promise<CommentEntity> {
    const { id, ...payload } = entity.toObject();

    const comment = await this.commentModel
      .query()
      .patchAndFetchById(id, payload);

    return CommentEntity.initialize(comment);
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { CommentRepository };
