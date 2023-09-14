import { type IncomingHttpHeaders } from 'node:http';

import {
  ApiPath,
  CustomHttpHeader,
  ExceptionMessage,
} from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '~/libs/packages/exceptions/exceptions.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';
import { token as articleToken } from '~/libs/packages/token/token.js';

import { GenreEntity } from '../genres/genre.entity.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import { INDEX_INCREMENT, SHARED_$TOKEN } from './libs/constants/constants.js';
import { DateFormat } from './libs/enums/enums.js';
import {
  getArticleReadTimeCompletionConfig,
  getDetectArticleGenreCompletionConfig,
  getDifferenceBetweenDates,
  getFormattedDate,
  getOriginFromRefererHeader,
  safeJSONParse,
  subtractMonthsFromDate,
} from './libs/helpers/helpers.js';
import {
  type ArticleCreateDto,
  type ArticleGetAllResponseDto,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleUpdateRequestDto,
  type ArticleWithCommentCountResponseDto,
  type DetectedArticleGenre,
  type UserActivityResponseDto,
  type UserArticlesGenreStatsResponseDto,
} from './libs/types/types.js';

class ArticleService implements IService {
  private articleRepository: ArticleRepository;
  private openAIService: OpenAIService;
  private genreRepository: GenreRepository;

  public constructor({
    articleRepository,
    openAIService,
    genreRepository,
  }: {
    articleRepository: ArticleRepository;
    openAIService: OpenAIService;
    genreRepository: GenreRepository;
  }) {
    this.articleRepository = articleRepository;
    this.openAIService = openAIService;
    this.genreRepository = genreRepository;
  }

  private async detectArticleGenreFromText(
    text: string,
  ): Promise<DetectedArticleGenre | null> {
    const genresJSON = await this.openAIService.createCompletion(
      getDetectArticleGenreCompletionConfig(text),
    );

    if (!genresJSON) {
      return null;
    }

    const [firstParsedGenre] =
      safeJSONParse<DetectedArticleGenre[]>(genresJSON) ?? [];

    return firstParsedGenre ?? null;
  }

  private async getArticleReadTime(text: string): Promise<number | null> {
    const readTimeJSON = await this.openAIService.createCompletion(
      getArticleReadTimeCompletionConfig(text),
    );

    if (!readTimeJSON) {
      return null;
    }

    const { readTime = null } =
      safeJSONParse<{ readTime: number }>(readTimeJSON) ?? {};

    return readTime;
  }

  private async getGenreIdForArticle(
    articleText: string,
  ): Promise<number | null> {
    const detectedGenre = await this.detectArticleGenreFromText(articleText);

    if (!detectedGenre) {
      return null;
    }

    const existingGenre = await this.genreRepository.findByKey(
      detectedGenre.key,
    );

    if (existingGenre) {
      return existingGenre.toObject().id;
    }

    const newGenreEntity = await this.genreRepository.create(
      GenreEntity.initializeNew(detectedGenre),
    );

    return newGenreEntity.toObject().id;
  }

  private async getGenreIdToSet({
    genreId,
    text,
  }: ArticleCreateDto): Promise<number | null> {
    if (genreId) {
      return genreId;
    }

    return await this.getGenreIdForArticle(text);
  }

  public async findAll(
    filters: ArticlesFilters,
  ): Promise<ArticleGetAllResponseDto> {
    const { items, total } = await this.articleRepository.findAll({
      ...filters,
      hasPublishedOnly: true,
    });

    return {
      total,
      items: items.map((article) =>
        article.toObjectWithRelationsAndCommentCount(),
      ),
    };
  }

  public async findOwn(
    userId: number,
    filters: ArticlesFilters,
  ): Promise<ArticleGetAllResponseDto> {
    const { items, total } = await this.articleRepository.findAll({
      userId,
      ...filters,
    });

    return {
      total,
      items: items.map((article) =>
        article.toObjectWithRelationsAndCommentCount(),
      ),
    };
  }

  public async find(id: number): Promise<ArticleResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    return article.toObjectWithRelations();
  }

  public async getUserActivity(
    userId: number,
  ): Promise<UserActivityResponseDto[]> {
    const ZERO_ACTIVITY_COUNT = 0;
    const MONTHS_TO_SUBTRACT_COUNT = 6;
    const currentDate = new Date();
    const sixMonthAgo = subtractMonthsFromDate(
      currentDate,
      MONTHS_TO_SUBTRACT_COUNT,
    );
    const daysInHalfYear = getDifferenceBetweenDates(currentDate, sixMonthAgo);

    const userActivity = await this.articleRepository.getUserActivity({
      userId,
      activityFrom: sixMonthAgo.toISOString(),
      activityTo: currentDate.toISOString(),
    });

    const halfYearActivity: UserActivityResponseDto[] = Array.from({
      length: daysInHalfYear + INDEX_INCREMENT,
    }).map((_, index) => {
      const incrementedDate = sixMonthAgo.getDate() + index;
      const dateForStatistic = new Date(
        sixMonthAgo.getFullYear(),
        sixMonthAgo.getMonth(),
        incrementedDate,
      ).toISOString();

      const activeDayIndex = userActivity.findIndex((activity) => {
        return (
          getFormattedDate(activity.date, DateFormat.YEAR_MONTH_DATE) ===
          getFormattedDate(dateForStatistic, DateFormat.YEAR_MONTH_DATE)
        );
      });

      if (activeDayIndex >= ZERO_ACTIVITY_COUNT) {
        const dayActivity = userActivity[activeDayIndex];

        return {
          date: dayActivity.date,
          count: Number(dayActivity.count),
        };
      }

      return {
        date: dateForStatistic,
        count: ZERO_ACTIVITY_COUNT,
      };
    });

    return halfYearActivity;
  }

  public async getUserArticlesGenreStats(
    userId: number,
  ): Promise<UserArticlesGenreStatsResponseDto> {
    const stats = await this.articleRepository.getUserArticlesGenreStats(
      userId,
    );

    return {
      items: stats.map((statsItem) => ({
        ...statsItem,
        count: Number.parseInt(statsItem.count),
      })),
    };
  }

  public async create(
    payload: ArticleCreateDto,
  ): Promise<ArticleWithCommentCountResponseDto> {
    const genreId = await this.getGenreIdToSet(payload);
    const readTime = await this.getArticleReadTime(payload.text);

    const article = await this.articleRepository.create(
      ArticleEntity.initializeNew({
        genreId,
        readTime,
        title: payload.title,
        text: payload.text,
        userId: payload.userId,
        coverId: payload.coverId,
        promptId: payload?.promptId ?? null,
        publishedAt: payload?.publishedAt ?? null,
      }),
    );

    return article.toObjectWithRelationsAndCommentCount();
  }

  public async update(
    id: number,
    {
      payload,
      user,
    }: { payload: ArticleUpdateRequestDto; user: UserAuthResponseDto },
  ): Promise<ArticleWithCommentCountResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new ApplicationError({
        message: `Article with id ${id} not found`,
      });
    }

    if (article.userId !== user.id) {
      throw new ForbiddenError('Article can be edited only by author!');
    }

    const updatedReadTime =
      payload.text && payload.text !== article.text
        ? await this.getArticleReadTime(payload.text)
        : article.readTime;

    const updatedArticle = await this.articleRepository.update(
      ArticleEntity.initialize({
        ...article,
        ...payload,
        readTime: updatedReadTime,
        commentCount: null,
      }),
    );

    return updatedArticle.toObjectWithRelationsAndCommentCount();
  }

  public async getArticleSharingLink(
    id: number,
    referer: string,
  ): Promise<{ link: string }> {
    const token = await articleToken.create({
      articleId: id,
    });

    const refererOrigin = getOriginFromRefererHeader(referer);

    return {
      link: `${refererOrigin}${ApiPath.ARTICLES}${SHARED_$TOKEN.replace(
        ':token',
        token,
      )}`,
    };
  }

  public async findShared(
    headers: IncomingHttpHeaders,
  ): Promise<ArticleResponseDto> {
    const token = headers[CustomHttpHeader.SHARED_ARTICLE_TOKEN] as string;

    if (!token) {
      throw new BadRequestError(ExceptionMessage.INVALID_TOKEN);
    }

    const encoded = await articleToken.verifyToken(token);

    const articleFound = await this.find(Number(encoded.articleId));

    if (!articleFound) {
      throw new NotFoundError(ExceptionMessage.ARTICLE_NOT_FOUND);
    }

    return articleFound;
  }

  public async delete(
    id: number,
    userId: number,
  ): Promise<ArticleWithCommentCountResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new ApplicationError({
        message: `Article with id ${id} not found`,
      });
    }

    const { deletedAt } = article;

    if (deletedAt) {
      throw new ApplicationError({
        message: `Article with id ${id} has already been deleted`,
      });
    }

    if (article.userId !== userId) {
      throw new ForbiddenError('Article can be deleted only by author!');
    }

    const deletedArticle = await this.articleRepository.delete(id);

    return deletedArticle.toObjectWithRelationsAndCommentCount();
  }
}

export { ArticleService };
