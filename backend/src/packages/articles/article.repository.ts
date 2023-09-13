import { type Page } from 'objection';

import { ArticleEntity } from './article.entity.js';
import { type ArticleModel } from './article.model.js';
import { EMPTY_COMMENT_COUNT } from './libs/constants/constants.js';
import { SortingOrder } from './libs/enums/enums.js';
import {
  getCommentsCountQuery,
  getWherePublishedOnlyQuery,
  getWhereUserIdQuery,
} from './libs/helpers/helpers.js';
import { type IArticleRepository } from './libs/interfaces/interfaces.js';
import {
  type ArticleCommentCount,
  type ArticlesFilters,
} from './libs/types/types.js';

class ArticleRepository implements IArticleRepository {
  private articleModel: typeof ArticleModel;

  private defaultRelationExpression = '[author.avatar,prompt,genre]';

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
      .select('articles.*', getCommentsCountQuery(this.articleModel))
      .where(getWhereUserIdQuery(userId))
      .where(getWherePublishedOnlyQuery(hasPublishedOnly))
      .orderBy('articles.publishedAt', SortingOrder.DESCENDING)
      .withGraphJoined(this.defaultRelationExpression)
      .page(skip / take, take)
      .castTo<Page<ArticleModel & ArticleCommentCount>>()
      .execute();

    return {
      total: articles.total,
      items: articles.results.map((article) =>
        ArticleEntity.initialize({
          ...article,
          author: {
            firstName: article.author.firstName,
            lastName: article.author.lastName,
            avatarUrl: article.author.avatar?.url ?? null,
          },
          genre: article.genre.name,
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
      .withGraphJoined(this.defaultRelationExpression);

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
      genre: article.genre.name,
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
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return ArticleEntity.initialize({
      ...article,
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
      genre: article.genre.name,
      prompt: article.prompt
        ? {
            character: article.prompt.character,
            setting: article.prompt.setting,
            situation: article.prompt.situation,
            prop: article.prompt.prop,
          }
        : null,
      commentCount: EMPTY_COMMENT_COUNT,
    });
  }

  public async update(entity: ArticleEntity): Promise<ArticleEntity> {
    const { id, ...payload } = entity.toObject();

    const article = await this.articleModel
      .query()
      .patchAndFetchById(id, payload)
      .select('articles.*', getCommentsCountQuery(this.articleModel))
      .withGraphFetched(this.defaultRelationExpression)
      .castTo<ArticleModel & ArticleCommentCount>()
      .execute();

    return ArticleEntity.initialize({
      ...article,
      author: {
        firstName: article.author.firstName,
        lastName: article.author.lastName,
        avatarUrl: article.author.avatar?.url ?? null,
      },
      genre: article.genre.name,
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

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleRepository };
