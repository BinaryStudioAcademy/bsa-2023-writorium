import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { SortingOrder } from './libs/enums/enums.js';
import { getWhereUserIdQuery } from './libs/helpers/helpers.js';
import { type UserActivityResponseDto } from './libs/types/types.js';

class ArticleRepository implements IRepository {
  private articleModel: typeof ArticleModel;

  private defaultRelationExpression = 'author';

  public constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }

  public async findAll({
    userId,
  }: {
    userId?: number;
  }): Promise<ArticleEntity[]> {
    const articles = await this.articleModel
      .query()
      .where(getWhereUserIdQuery(userId))
      .orderBy('articles.publishedAt', SortingOrder.DESCENDING)
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

  public async getUserActivity({
    userId,
    activityFrom,
    activityTo,
  }: {
    userId: number;
    activityFrom: string;
    activityTo: string;
  }): Promise<UserActivityResponseDto> {
    const userActivity = (await this.articleModel
      .query()
      .select(
        this.articleModel.raw('date(created_at), date(updated_at) as date'),
        this.articleModel.raw('count(*)'),
      )
      .where({ userId })
      .whereBetween('createdAt', [activityFrom, activityTo])
      .groupByRaw('date(created_at), date(updated_at)')) as unknown;

    return userActivity as UserActivityResponseDto;
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
