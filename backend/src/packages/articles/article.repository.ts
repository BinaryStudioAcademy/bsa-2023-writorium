import { type Model, type Page, type QueryBuilder } from 'objection';

import { DatabaseTableName } from '~/libs/packages/database/libs/enums/enums.js';
import { type ArticleViewModel } from '~/packages/article-views/article-view.model.js';
import { type CommentModel } from '~/packages/comments/comment.model.js';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { type FavouredUserArticlesModel } from './favoured-user-articles.model.js';
import { ZERO_COUNT } from './libs/constants/constants.js';
import {
  getArticlePublishedStatusQuery,
  getIsFavouriteSubQuery,
  getShowFavouritesQuery,
  getSortingCondition,
  getWhereAuthorIdQuery,
  getWhereGenreIdQuery,
  getWherePublishedOnlyQuery,
  getWhereTitleLikeQuery,
  getWhereUserIdQuery,
} from './libs/helpers/helpers.js';
import { type IArticleRepository } from './libs/interfaces/interfaces.js';
import {
  type ArticleCounts,
  type ArticleGenreStatsFilters,
  type ArticlesFilters,
  type GetUserArticlesGenresStatsDatabaseResponse,
  type UserActivityResponseDto,
} from './libs/types/types.js';

class ArticleRepository implements IArticleRepository {
  private articleModel: typeof ArticleModel;
  private favouriteArticlesModel: typeof FavouredUserArticlesModel;

  private defaultRelationExpression = '[author.avatar, prompt, genre, cover]';

  public constructor(
    articleModel: typeof ArticleModel,
    favouriteArticlesModel: typeof FavouredUserArticlesModel,
  ) {
    this.articleModel = articleModel;
    this.favouriteArticlesModel = favouriteArticlesModel;
  }

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

  private getViewsCountQuery(): QueryBuilder<ArticleViewModel> {
    return this.articleModel
      .relatedQuery<ArticleViewModel>('articleViews')
      .countDistinct('viewed_by_id')
      .as('viewCount');
  }

  public async findAll({
    userId,
    take,
    skip,
    hasPublishedOnly,
    genreId,
    titleFilter,
    authorId,
    showFavourites,
    requestUserId,
  }: {
    userId?: number;
    hasPublishedOnly?: boolean;
    requestUserId: number;
  } & ArticlesFilters): Promise<{ items: ArticleEntity[]; total: number }> {
    const articles = await this.articleModel
      .query()
      .select(
        `${DatabaseTableName.ARTICLES}.*`,
        this.getCommentsCountQuery(),
        this.getViewsCountQuery(),
        getIsFavouriteSubQuery(Boolean(showFavourites), requestUserId),
      )
      .withGraphJoined(this.defaultRelationExpression)
      .withGraphFetched('reactions')
      .modifyGraph('reactions', this.modifyReactionsGraph)
      .where(getWhereUserIdQuery(userId))
      .where(getWhereGenreIdQuery(genreId))
      .where(getWhereAuthorIdQuery(authorId))
      .where(getWhereTitleLikeQuery(titleFilter))
      .where(getShowFavouritesQuery(Boolean(showFavourites), requestUserId))
      .where(getWherePublishedOnlyQuery(hasPublishedOnly))
      .whereNull('deletedAt')
      .orderBy(getSortingCondition(hasPublishedOnly))
      .page(skip / take, take)
      .castTo<Page<ArticleModel & ArticleCounts>>();

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
          isFavourite: article.isFavourite,
        }),
      ),
    };
  }

  public async find(id: number): Promise<ArticleEntity | null> {
    const article = await this.articleModel
      .query()
      .findById(id)
      .withGraphJoined(this.defaultRelationExpression)
      .withGraphFetched('reactions')
      .modifyGraph('reactions', this.modifyReactionsGraph)
      .whereNull('deletedAt');

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
      viewCount: null,
    });
  }

  public async findWithIsFavourite(
    id: number,
    userId: number,
  ): Promise<ArticleEntity | null> {
    const article = await this.articleModel
      .query()
      .select(
        `${DatabaseTableName.ARTICLES}.*`,
        getIsFavouriteSubQuery(false, userId),
      )
      .withGraphJoined(this.defaultRelationExpression)
      .withGraphFetched('reactions')
      .modifyGraph('reactions', this.modifyReactionsGraph)
      .where({ 'articles.id': id })
      .first();

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
      isFavourite: article.isFavourite,
      viewCount: null,
    });
  }

  public async create(entity: ArticleEntity): Promise<ArticleEntity> {
    const payload = entity.toNewObject();

    const article = await this.articleModel
      .query()
      .insert(payload)
      .withGraphFetched(this.defaultRelationExpression)
      .withGraphFetched('reactions')
      .modifyGraph('reactions', this.modifyReactionsGraph)
      .returning('*');

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
      commentCount: ZERO_COUNT,
      coverUrl: article.cover?.url ?? null,
      viewCount: ZERO_COUNT,
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

  public getUserArticlesGenreStats(
    userId: number,
    { articlePublishedStatus }: ArticleGenreStatsFilters,
  ): Promise<GetUserArticlesGenresStatsDatabaseResponse[]> {
    return this.articleModel
      .query()
      .select(
        'genre.name',
        'genre.key',
        this.articleModel.raw('count(*) as count'),
      )
      .joinRelated('genre')
      .groupBy('genre.key', 'genre.name')
      .where({ userId })
      .where(getArticlePublishedStatusQuery(articlePublishedStatus))
      .castTo<GetUserArticlesGenresStatsDatabaseResponse[]>()
      .execute();
  }

  public async update(entity: ArticleEntity): Promise<ArticleEntity> {
    const { id, ...payload } = entity.toObject();

    const article = await this.articleModel
      .query()
      .patchAndFetchById(id, payload)
      .select(`${DatabaseTableName.ARTICLES}.*`, this.getCommentsCountQuery())
      .withGraphFetched(this.defaultRelationExpression)
      .withGraphFetched('reactions')
      .modifyGraph('reactions', this.modifyReactionsGraph)
      .castTo<ArticleModel & ArticleCounts>();

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

  public async delete(id: number): Promise<ArticleEntity> {
    const article = await this.articleModel
      .query()
      .patchAndFetchById(id, { deletedAt: new Date().toISOString() })
      .select(`${DatabaseTableName.ARTICLES}.*`, this.getCommentsCountQuery())
      .withGraphFetched(this.defaultRelationExpression)
      .castTo<ArticleModel & ArticleCounts>();

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
      coverUrl: article.cover?.url ?? null,
    });
  }

  public countArticlesByUserId(userId: number): Promise<number> {
    return this.articleModel.query().where({ userId }).resultSize();
  }

  public async toggleIsFavourite(
    userId: number,
    articleId: number,
  ): Promise<FavouredUserArticlesModel | FavouredUserArticlesModel[]> {
    return await this.favouriteArticlesModel.transaction(async () => {
      const currentData = await this.favouriteArticlesModel
        .query()
        .where({ articleId, userId })
        .first();

      if (!currentData) {
        return await this.favouriteArticlesModel
          .query()
          .insert({ userId, articleId })
          .returning(['article_id', 'user_id']);
      }

      return await this.favouriteArticlesModel
        .query()
        .delete()
        .where({ articleId, userId })
        .returning(['article_id', 'user_id']);
    });
  }
}

export { ArticleRepository };
