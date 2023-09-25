import { type IncomingHttpHeaders } from 'node:http';

import {
  ApiPath,
  CustomHttpHeader,
  ExceptionMessage,
} from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { DatabaseTableName } from '~/libs/packages/database/database.js';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '~/libs/packages/exceptions/exceptions.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';
import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import { type SocketService } from '~/libs/packages/socket/socket.package.js';
import { token as articleToken } from '~/libs/packages/token/token.js';
import { type ArticleViewService } from '~/packages/article-views/article-view.service.js';
import { type FollowRepository } from '~/packages/follow/follow.js';

import { type AchievementService } from '../achievements/achievement.service.js';
import { GenreEntity } from '../genres/genre.entity.js';
import { UNKNOWN_GENRE_KEY } from '../genres/genre.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import {
  FIRST_ELEMENT_ARRAY_INDEX,
  INDEX_INCREMENT,
  SHARED_$TOKEN,
} from './libs/constants/constants.js';
import { ArticleSocketEvent, DateFormat } from './libs/enums/enums.js';
import {
  getArticleImprovementSuggestionsCompletionConfig,
  getArticleReadTimeCompletionConfig,
  getDetectArticleGenreCompletionConfig,
  getDifferenceBetweenDates,
  getFormattedDate,
  getOriginFromRefererHeader,
  parseJSONSafely,
  subtractMonthsFromDate,
} from './libs/helpers/helpers.js';
import {
  type ArticleCreateDto,
  type ArticleGenreStatsFilters,
  type ArticleGetAllResponseDto,
  type ArticleGetImprovementSuggestionsResponseDto,
  type ArticleImprovementSuggestion,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleSocketEventPayload,
  type ArticleUpdateRequestDto,
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
  type DetectedArticleGenre,
  type UserActivityResponseDto,
  type UserArticlesGenreStatsResponseDto,
} from './libs/types/types.js';

type Constructor = {
  articleRepository: ArticleRepository;
  openAIService: OpenAIService;
  genreRepository: GenreRepository;
  socketService: SocketService;
  articleViewService: ArticleViewService;
  followRepository: FollowRepository;
  achievementService: AchievementService;
};

class ArticleService implements IService {
  private articleRepository: ArticleRepository;
  private openAIService: OpenAIService;
  private genreRepository: GenreRepository;
  private socketService: SocketService;
  private achievementService: AchievementService;
  private articleViewService: ArticleViewService;
  private followRepository: FollowRepository;

  public constructor({
    articleRepository,
    openAIService,
    genreRepository,
    socketService,
    articleViewService,
    followRepository,
    achievementService,
  }: Constructor) {
    this.articleRepository = articleRepository;
    this.openAIService = openAIService;
    this.genreRepository = genreRepository;
    this.socketService = socketService;
    this.followRepository = followRepository;
    this.articleViewService = articleViewService;
    this.achievementService = achievementService;
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

    const parsedGenres = parseJSONSafely<DetectedArticleGenre[]>(genresJSON);

    if (
      Array.isArray(parsedGenres) &&
      parsedGenres[FIRST_ELEMENT_ARRAY_INDEX]
    ) {
      return parsedGenres[FIRST_ELEMENT_ARRAY_INDEX];
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
      parseJSONSafely<{ readTime: number }>(readTimeJSON) ?? {};

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

  private async checkActualGenre(
    genreId: number | null,
    articleText: string,
  ): Promise<number | null> {
    if (!genreId) {
      return genreId;
    }
    const currentGenre = await this.genreRepository.find(genreId);

    if (!currentGenre) {
      throw new ApplicationError({
        message: `Genre with id:${genreId} doesn't exist! `,
      });
    }

    const genresJSON = await this.openAIService.createCompletion(
      getDetectArticleGenreCompletionConfig(articleText),
    );

    if (!genresJSON) {
      return genreId;
    }

    const parsedGenres = parseJSONSafely<DetectedArticleGenre[]>(genresJSON);
    if (!parsedGenres || !Array.isArray(parsedGenres) || !parsedGenres.length) {
      return genreId;
    }

    const currentGenreInSuggestions =
      parsedGenres.some((item) => item.key === currentGenre.toObject().key) &&
      currentGenre.toObject().key !== UNKNOWN_GENRE_KEY;

    if (currentGenreInSuggestions) {
      return genreId;
    }

    const [suggestedGenre] = parsedGenres;

    const existingGenre = await this.genreRepository.findByKey(
      suggestedGenre.key,
    );

    if (existingGenre) {
      return existingGenre.toObject().id;
    }

    const newGenreEntity = await this.genreRepository.create(
      GenreEntity.initializeNew(suggestedGenre),
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

  public async findArticleWithFollow(
    id: number,
    userId?: number,
  ): Promise<ArticleWithFollowResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      throw new NotFoundError(ExceptionMessage.ARTICLE_NOT_FOUND);
    }

    const articleObject = article.toObjectWithRelations();

    const { isFollowed, followersCount } =
      await this.followRepository.getAuthorFollowersCountAndStatus({
        userId,
        authorId: articleObject.userId,
      });

    await this.articleViewService.create({
      articleId: id,
      viewedById: userId as number,
    });

    return {
      ...articleObject,
      author: { ...articleObject.author, isFollowed, followersCount },
    };
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
      parseJSONSafely<ArticleImprovementSuggestion[]>(suggestionsJSON);

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
      throw new NotFoundError(ExceptionMessage.ARTICLE_NOT_FOUND);
    }

    const suggestions = await this.generateImprovementSuggestions(article.text);

    if (!suggestions) {
      throw new ApplicationError({
        message: ExceptionMessage.FAILED_TO_GENERATE_IMPROVEMENT_SUGGESTIONS,
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

    const userActivities = await this.articleRepository.getUserActivity({
      userId,
      activityFrom: sixMonthAgo.toISOString(),
      activityTo: currentDate.toISOString(),
    });

    const halfYearActivities: UserActivityResponseDto[] = Array.from({
      length: daysInHalfYear + INDEX_INCREMENT,
    }).map((_, index) => {
      const incrementedDate = sixMonthAgo.getDate() + index;
      const dateForStatistic = new Date(
        sixMonthAgo.getFullYear(),
        sixMonthAgo.getMonth(),
        incrementedDate,
      ).toISOString();

      const activeDayIndex = userActivities.findIndex((activity) => {
        return (
          getFormattedDate(activity.date, DateFormat.YEAR_MONTH_DATE) ===
          getFormattedDate(dateForStatistic, DateFormat.YEAR_MONTH_DATE)
        );
      });

      if (activeDayIndex >= ZERO_ACTIVITY_COUNT) {
        const dayActivity = userActivities[activeDayIndex];

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

    return halfYearActivities;
  }

  public async getUserArticlesGenreStats(
    userId: number,
    filters: ArticleGenreStatsFilters,
  ): Promise<UserArticlesGenreStatsResponseDto> {
    const stats = await this.articleRepository.getUserArticlesGenreStats(
      userId,
      filters,
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
    const withPrompt = Boolean(payload.promptId);
    const genreId = await this.getGenreIdToSet(payload);

    const readTime = await this.getArticleReadTime(payload.text);

    const article = await this.articleRepository.create(
      ArticleEntity.initializeNew({
        genreId: withPrompt
          ? await this.checkActualGenre(genreId, payload.text)
          : genreId,
        readTime,
        title: payload.title,
        text: payload.text,
        userId: payload.userId,
        coverId: payload.coverId,
        promptId: payload?.promptId ?? null,
        publishedAt: payload?.publishedAt ?? null,
      }),
    );

    const socketEventPayload: ArticleSocketEventPayload[typeof ArticleSocketEvent.NEW_ARTICLE] =
      article.toObjectWithRelationsAndCounts();

    this.socketService.io
      .of(SocketNamespace.ARTICLES)
      .to(SocketRoom.ARTICLES_FEED)
      .emit(ArticleSocketEvent.NEW_ARTICLE, socketEventPayload);

    const countOfOwnArticles =
      await this.articleRepository.countArticlesByUserId(payload.userId);

    await this.achievementService.checkAchievement({
      userId: payload.userId,
      countOfItems: countOfOwnArticles,
      referenceTable: DatabaseTableName.ARTICLES,
    });

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
      throw new NotFoundError(ExceptionMessage.ARTICLE_NOT_FOUND);
    }

    if (article.userId !== user.id) {
      throw new ForbiddenError(
        ExceptionMessage.ARTICLE_CAN_BE_EDITED_ONLY_BY_AUTHOR,
      );
    }

    let updatedGenreId = payload.genreId ?? article.genreId;

    if (payload.text && (article.promptId || payload.promptId)) {
      updatedGenreId = await this.checkActualGenre(
        updatedGenreId,
        payload.text,
      );
    }

    const updatedReadTime =
      payload.text && payload.text !== article.text
        ? await this.getArticleReadTime(payload.text)
        : article.readTime;

    const updatedArticle = await this.articleRepository.update(
      ArticleEntity.initialize({
        ...article,
        ...payload,
        genreId: updatedGenreId,
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
  ): Promise<ArticleWithFollowResponseDto> {
    const token = headers[CustomHttpHeader.SHARED_ARTICLE_TOKEN] as string;

    if (!token) {
      throw new BadRequestError(ExceptionMessage.INVALID_TOKEN);
    }

    const encoded = await articleToken.verifyToken(token);

    const articleFound = await this.findArticleWithFollow(
      Number(encoded.articleId),
    );

    if (!articleFound) {
      throw new NotFoundError(ExceptionMessage.ARTICLE_NOT_FOUND);
    }

    return articleFound;
  }

  public async getArticleIdByToken(
    headers: IncomingHttpHeaders,
  ): Promise<Pick<ArticleWithFollowResponseDto, 'id'>> {
    const token = headers[CustomHttpHeader.SHARED_ARTICLE_TOKEN] as string;

    if (!token) {
      throw new BadRequestError(ExceptionMessage.INVALID_TOKEN);
    }

    const encoded = await articleToken.verifyToken(token);

    return {
      id: Number(encoded.articleId),
    };
  }

  public async delete(
    id: number,
    userId: number,
  ): Promise<ArticleWithCountsResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new NotFoundError(ExceptionMessage.ARTICLE_NOT_FOUND);
    }

    if (article.userId !== userId) {
      throw new ForbiddenError(
        ExceptionMessage.ARTICLE_CAN_BE_EDITED_ONLY_BY_AUTHOR,
      );
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
        message: ExceptionMessage.UNABLE_TO_UPDATE_ARTICLE_STATUS,
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
