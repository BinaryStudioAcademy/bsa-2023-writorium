import { type IncomingHttpHeaders } from 'node:http';

import {
  ApiPath,
  CustomHttpHeader,
  ExceptionMessage,
} from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '~/libs/packages/exceptions/exceptions.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';
import { token as articleToken } from '~/libs/packages/token/token.js';
import { type ArticleViewService } from '~/packages/article-views/article-view.service.js';

import { GenreEntity } from '../genres/genre.entity.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import { INDEX_INCREMENT, SHARED_$TOKEN } from './libs/constants/constants.js';
import { DateFormat } from './libs/enums/enums.js';
import {
  getArticleImprovementSuggestionsCompletionConfig,
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
  type ArticleGetImprovementSuggestionsResponseDto,
  type ArticleImprovementSuggestion,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleUpdateRequestDto,
  type ArticleWithCountsResponseDto,
  type DetectedArticleGenre,
  type UserActivityResponseDto,
  type UserArticlesGenreStatsResponseDto,
} from './libs/types/types.js';

class ArticleService implements IService {
  private articleRepository: ArticleRepository;
  private openAIService: OpenAIService;
  private genreRepository: GenreRepository;
  private articleViewService: ArticleViewService;

  public constructor({
    articleRepository,
    openAIService,
    genreRepository,
    articleViewService,
  }: {
    articleRepository: ArticleRepository;
    openAIService: OpenAIService;
    genreRepository: GenreRepository;
    articleViewService: ArticleViewService;
  }) {
    this.articleRepository = articleRepository;
    this.openAIService = openAIService;
    this.genreRepository = genreRepository;
    this.articleViewService = articleViewService;
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

    const parsedGenres = safeJSONParse<DetectedArticleGenre[]>(genresJSON);

    const FIRST_ITEM_INDEX = 0;

    if (Array.isArray(parsedGenres) && parsedGenres[FIRST_ITEM_INDEX]) {
      return parsedGenres[FIRST_ITEM_INDEX];
    }

    return null;
  }

  private async getArticleReadTime(text: string): Promise<number | null> {
    const readTimeJSON = await this.openAIService.createCompletion(
      getArticleReadTimeCompletionConfig(text),
    );

    if (!readTimeJSON) {
      return null;
    }

    const readTimeData =
      safeJSONParse<{ readTime: number }>(readTimeJSON) ?? {};

    if (
      'readTime' in readTimeData &&
      typeof readTimeData.readTime === 'number'
    ) {
      return readTimeData.readTime;
    }

    return null;
  }

  private async getGenreIdForArticle(
    articleText: string,
  ): Promise<number | null> {
    const detectedGenre = await this.detectArticleGenreFromText(articleText);

    if (!detectedGenre) {
      const unknownGenre = await this.genreRepository.getUnknownGenre();
      return unknownGenre.toObject().id;
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
    filters: ArticlesFilters & { requestUserId: number },
  ): Promise<ArticleGetAllResponseDto> {
    const { items, total } = await this.articleRepository.findAll({
      ...filters,
      hasPublishedOnly: true,
    });

    return {
      total,
      items: items.map((article) => article.toObjectWithRelationsAndCounts()),
    };
  }

  public async findOwn(
    userId: number,
    filters: ArticlesFilters,
  ): Promise<ArticleGetAllResponseDto> {
    const { items, total } = await this.articleRepository.findAll({
      userId,
      requestUserId: userId,
      ...filters,
    });

    return {
      total,
      items: items.map((article) => article.toObjectWithRelationsAndCounts()),
    };
  }

  public async find(id: number): Promise<ArticleResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    return article.toObjectWithRelations();
  }

  public async findById(
    id: number,
    userId?: number,
  ): Promise<ArticleResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    await this.articleViewService.create({
      articleId: id,
      viewedById: userId as number,
    });

    return article.toObjectWithRelations();
  }

  private async generateImprovementSuggestions(
    text: string,
  ): Promise<ArticleImprovementSuggestion[] | null> {
    const suggestionsJSON = await this.openAIService.createCompletion(
      getArticleImprovementSuggestionsCompletionConfig(text),
    );

    if (!suggestionsJSON) {
      return null;
    }

    const parsedSuggestions =
      safeJSONParse<ArticleImprovementSuggestion[]>(suggestionsJSON);

    if (Array.isArray(parsedSuggestions)) {
      return parsedSuggestions;
    }

    return null;
  }

  public async getImprovementSuggestions(
    id: number,
  ): Promise<ArticleGetImprovementSuggestionsResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new ApplicationError({
        message: `Article with id ${id} not found`,
      });
    }

    const suggestions = await this.generateImprovementSuggestions(article.text);

    if (!suggestions) {
      throw new ApplicationError({
        message: 'Failed to generate improvement suggestions for article',
      });
    }

    return { items: suggestions };
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
  ): Promise<ArticleWithCountsResponseDto> {
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

    return article.toObjectWithRelationsAndCounts();
  }

  public async update(
    id: number,
    {
      payload,
      user,
    }: { payload: ArticleUpdateRequestDto; user: UserAuthResponseDto },
  ): Promise<ArticleWithCountsResponseDto> {
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
        viewCount: null,
      }),
    );

    return updatedArticle.toObjectWithRelationsAndCounts();
  }

  public async getArticleSharingLink(
    id: number,
    referer: string,
  ): Promise<{ link: string }> {
    const token = await articleToken.create({
      articleId: id,
    });

    const refererOrigin = getOriginFromRefererHeader(referer) ?? '';

    const link = configureString(
      refererOrigin,
      ApiPath.ARTICLES,
      SHARED_$TOKEN,
      { token },
    );

    return {
      link,
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
  ): Promise<ArticleWithCountsResponseDto> {
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

    return deletedArticle.toObjectWithRelationsAndCounts();
  }

  public async toggleIsFavourite(
    userId: number,
    articleId: number,
  ): Promise<ArticleResponseDto | null> {
    const toggleResult = await this.articleRepository.toggleIsFavourite(
      userId,
      articleId,
    );
    if (!toggleResult) {
      throw new ApplicationError({
        message: 'Unable to update article status',
      });
    }

    const article = await this.articleRepository.findWithIsFavourite(
      articleId,
      userId,
    );
    if (!article) {
      return null;
    }
    return article.toObjectWithRelationsAndCounts();
  }
}

export { ArticleService };
