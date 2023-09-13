import { type Model, type Page, type QueryBuilder } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/libs/enums/database-table-name.enum.js';
import { type CommentModel } from '~/packages/comments/comment.model.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { EMPTY_COMMENT_COUNT } from './libs/constants/constants.js';
import { SortingOrder } from './libs/enums/enums.js';
import {
  getWherePublishedOnlyQuery,
  getWhereUserIdQuery,
} from './libs/helpers/helpers.js';
import { type IArticleRepository } from './libs/interfaces/interfaces.js';
import {
  type ArticleCommentCount,
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

  private getCommentsCountQuery(): QueryBuilder<CommentModel> {
    return this.articleModel
      .relatedQuery<CommentModel>(DatabaseTableName.COMMENTS)
      .count()
      .as('commentCount');
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
      .select('articles.*', this.getCommentsCountQuery())
      .where(getWhereUserIdQuery(userId))
      .where(getWherePublishedOnlyQuery(hasPublishedOnly))
      .orderBy('articles.publishedAt', SortingOrder.DESCENDING)
      .page(skip / take, take)
      .modify(this.joinArticleRelations)
      .castTo<Page<ArticleModel & ArticleCommentCount>>();

    return {
      total: articles.total,
      items: articles.results.map((article) =>
        ArticleEntity.initialize({
          ...article,
          coverUrl: article.cover?.url ?? null,
          author: {
            firstName: article.author.firstName,
            lastName: article.author.lastName,
            avatarUrl: article.author.avatar?.url ?? null,
          },
          genre: article.genre?.name ?? null,
          prompt: article.prompt
            ? {
                character: article.prompt.character,
                setting: article.prompt.setting,
                situation: article.prompt.situation,
                prop: article.prompt.prop,
              }
            : null,
        }),
      ),
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
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
      genre: article.genre?.name ?? null,
      coverUrl: article.cover?.url ?? null,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
      commentCount: null,
    });
  }

  public async create(entity: ArticleEntity): Promise<ArticleEntity> {
    const payload = entity.toNewObject();

    const article = await this.articleModel
      .query()
      .insert(payload)
      .returning('*')
      .withGraphFetched(this.defaultRelationExpression)
      .modifyGraph('reactions', this.modifyReactionsGraph);

    return ArticleEntity.initialize({
      ...article,
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
      genre: article.genre?.name ?? null,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
      commentCount: EMPTY_COMMENT_COUNT,
      coverUrl: article.cover?.url ?? null,
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
      .select('articles.*', this.getCommentsCountQuery())
      .withGraphFetched(this.defaultRelationExpression)
      .modifyGraph('reactions', this.modifyReactionsGraph)
      .castTo<ArticleModel & ArticleCommentCount>();

    return ArticleEntity.initialize({
      ...article,
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
      genre: article.genre?.name ?? null,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
      coverUrl: article.cover?.url ?? null,
    });
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleRepository };
