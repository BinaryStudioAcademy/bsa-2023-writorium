import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { SortingOrder } from './libs/enums/enums.js';
import { getWhereUserIdQuery } from './libs/helpers/helpers.js';
import { type ArticlesFilters } from './libs/types/types.js';

class ArticleRepository implements IRepository {
  private articleModel: typeof ArticleModel;

  private defaultRelationExpression = 'author';

  public constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }

  public getArticlesTotal({
    userId,
  }: { userId?: number } = {}): Promise<number> {
    return this.articleModel
      .query()
      .where(getWhereUserIdQuery(userId))
      .resultSize();
  }

  public async findAll({
    userId,
    take = 10,
    skip = 0,
  }: {
    userId?: number;
  } & ArticlesFilters): Promise<ArticleEntity[]> {
    const articles = await this.articleModel
      .query()
      .where(getWhereUserIdQuery(userId))
      .orderBy('articles.publishedAt', SortingOrder.DESCENDING)
      .offset(skip)
      .limit(take)
      .withGraphJoined(this.defaultRelationExpression);

    return articles.map((article) =>
      ArticleEntity.initializeWithAuthor(article),
    );
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
