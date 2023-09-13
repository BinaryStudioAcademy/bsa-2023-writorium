import { type Model, type QueryBuilder } from 'objection';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import {
  getSortingCondition,
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

  private defaultRelationExpression =
    '[author.avatar, prompt, genre, reactions, cover]';

  public constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }

  private joinArticleRelations = <T>(
    queryBuilder: QueryBuilder<ArticleModel, T>,
  ): void => {
    void queryBuilder
      .withGraphJoined(this.defaultRelationExpression)
      .modifyGraph('reactions', this.modifyReactionsGraph);
  };

  private modifyReactionsGraph = (
    builder: QueryBuilder<Model, Model[]>,
  ): void => {
    void builder.select('id', 'isLike', 'userId');
  };

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
      .orderBy(getSortingCondition(hasPublishedOnly))
      .page(skip / take, take)
      .modify(this.joinArticleRelations);

    return {
      total: articles.total,
      items: articles.results.map((article) => {
        return ArticleEntity.initialize({
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
          author: {
            firstName: article.author.firstName,
            lastName: article.author.lastName,
            avatarUrl: article.author.avatar?.url ?? null,
          },
        });
      }),
    };
  }

  public async find(id: number): Promise<ArticleEntity | null> {
    const article = await this.articleModel
      .query()
      .findById(id)
      .modify(this.joinArticleRelations);

    if (!article) {
      return null;
    }

    return ArticleEntity.initialize({
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
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
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
      .withGraphFetched(this.defaultRelationExpression)
      .modifyGraph('reactions', this.modifyReactionsGraph);

    return ArticleEntity.initialize({
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
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
    });
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
      .withGraphFetched(this.defaultRelationExpression)
      .modifyGraph('reactions', this.modifyReactionsGraph);

    return ArticleEntity.initialize({
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
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
    });
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleRepository };
