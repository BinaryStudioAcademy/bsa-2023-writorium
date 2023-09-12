import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { SortingOrder } from './libs/enums/enums.js';
import {
  getWherePublishedOnlyQuery,
  getWhereUserIdQuery,
} from './libs/helpers/helpers.js';
import { type IArticleRepository } from './libs/interfaces/interfaces.js';
import {
  type ArticlesFilters,
  type UserActivityResponseDto,
} from './libs/types/types.js';

class ArticleRepository implements IArticleRepository {
  private articleModel: typeof ArticleModel;

  private defaultRelationExpression = '[author,prompt,genre,cover]';

  public constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }

  public async findAll({
    userId,
    take,
    skip,
    hasPublishedOnly,
  }: {
    userId?: number;
    hasPublishedOnly?: boolean;
  } & ArticlesFilters): Promise<{ items: ArticleEntity[]; total: number }> {
    const articles = await this.articleModel
      .query()
      .where(getWhereUserIdQuery(userId))
      .where(getWherePublishedOnlyQuery(hasPublishedOnly))
      .whereNull('deletedAt')
      .orderBy('articles.publishedAt', SortingOrder.DESCENDING)
      .page(skip / take, take)
      .withGraphJoined(this.defaultRelationExpression);

    return {
      total: articles.total,
      items: articles.results.map((article) => {
        return ArticleEntity.initializeWithAuthor({
          ...article,
          coverUrl: article.cover?.url,
          genre: article.genre?.name ?? null,
          prompt: article.prompt
            ? {
                character: article.prompt.character,
                setting: article.prompt.setting,
                situation: article.prompt.situation,
                prop: article.prompt.prop,
              }
            : null,
        });
      }),
    };
  }

  public async find(id: number): Promise<ArticleEntity | null> {
    const article = await this.articleModel
      .query()
      .findById(id)
      .withGraphJoined(this.defaultRelationExpression);

    if (!article) {
      return null;
    }

    return ArticleEntity.initializeWithAuthor({
      ...article,
      genre: article.genre?.name ?? null,
      coverUrl: article.cover?.url,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
    });
  }

  public async create(entity: ArticleEntity): Promise<ArticleEntity> {
    const {
      title,
      text,
      promptId,
      genreId,
      userId,
      publishedAt,
      coverId,
      readTime,
    } = entity.toNewObject();

    const article = await this.articleModel
      .query()
      .insert({
        title,
        text,
        promptId,
        genreId,
        coverId,
        userId,
        publishedAt,
        readTime,
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
  }): Promise<UserActivityResponseDto[]> {
    return await this.articleModel
      .query()
      .select(
        this.articleModel.raw('date(created_at), date(updated_at) as date'),
        this.articleModel.raw('count(*)'),
      )
      .where({ userId })
      .whereBetween('createdAt', [activityFrom, activityTo])
      .groupByRaw('date(created_at), date(updated_at)')
      .castTo<UserActivityResponseDto[]>();
  }

  public async update(entity: ArticleEntity): Promise<ArticleEntity> {
    const { id, ...payload } = entity.toObject();

    const article = await this.articleModel
      .query()
      .patchAndFetchById(id, payload)
      .withGraphFetched(this.defaultRelationExpression);

    return ArticleEntity.initializeWithAuthor({
      ...article,
      genre: article.genre?.name ?? null,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
    });
  }

  public async delete(id: number): Promise<ArticleEntity> {
    const article = await this.articleModel
      .query()
      .patchAndFetchById(id, { deletedAt: new Date().toISOString() })
      .withGraphFetched(this.defaultRelationExpression);

    return ArticleEntity.initializeWithAuthor({
      ...article,
      genre: article.genre?.name ?? null,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
    });
  }
}

export { ArticleRepository };
