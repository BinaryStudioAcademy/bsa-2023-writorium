import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';

class ArticleRepository implements IRepository {
  private articleModel: typeof ArticleModel;

  public constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }

  public find(): Promise<unknown> {
    return Promise.resolve();
  }

  public findAll(): Promise<unknown[]> {
    return Promise.resolve([]);
  }

  public async findById(id: number): Promise<ArticleEntity | null> {
    const article = await this.articleModel.query().findById(id).execute();

    if (!article) {
      return null;
    }

    return ArticleEntity.initialize(article);
  }

  public async create(entity: ArticleEntity): Promise<ArticleEntity> {
    const { title, text, promptId, genreId, userId, publishedAt } =
      entity.toNewObject();

    const article = await this.articleModel
      .query()
      .insert({
        title,
        text,
        promptId,
        genreId,
        userId,
        publishedAt,
      })
      .returning('*')
      .execute();

    return ArticleEntity.initialize(article);
  }

  public async update(entity: ArticleEntity): Promise<ArticleEntity> {
    const { id, ...payload } = entity.toObject();

    const article = await this.articleModel
      .query()
      .patchAndFetchById(id, payload);

    return ArticleEntity.initialize(article);
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleRepository };
