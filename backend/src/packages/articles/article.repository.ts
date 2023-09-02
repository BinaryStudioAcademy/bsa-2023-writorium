import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { SortingOrder } from './libs/enums/enums.js';

class ArticleRepository implements IRepository {
  private articleModel: typeof ArticleModel;

  public constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }

  public async findAll(): Promise<ArticleEntity[]> {
    const articles = await this.articleModel
      .query()
      .orderBy('publishedAt', SortingOrder.DESCENDING)
      .withGraphFetched('author');

    return articles.map((article) => ArticleEntity.initializeWithUser(article));
  }

  public async findOwn(id: number): Promise<ArticleEntity[]> {
    const articles = await this.articleModel
      .query()
      .where('userId', id)
      .orderBy('publishedAt', SortingOrder.DESCENDING)
      .execute();

    return articles.map((article) => ArticleEntity.initialize(article));
  }

  public async find(id: number): Promise<ArticleEntity | null> {
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
