import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { ForbiddenError } from '~/libs/packages/exceptions/exceptions.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';

import { GenreEntity } from '../genres/genre.entity.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import { INDEX_INCREMENT } from './libs/constants/constants.js';
import { DateFormat } from './libs/enums/enums.js';
import {
  getArticleReadTimeCompletionConfig,
  getDetectArticleGenreCompletionConfig,
  getDifferenceBetweenDates,
  getFormattedDate,
  safeJSONParse,
  subtractMonthsFromDate,
} from './libs/helpers/helpers.js';
import {
  type ArticleBaseResponseDto,
  type ArticleCreateDto,
  type ArticleGetAllResponseDto,
  type ArticlesFilters,
  type ArticleUpdateRequestDto,
  type ArticleWithAuthorType,
  type DetectedArticleGenre,
  type UserActivityResponseDto,
} from './libs/types/types.js';

class ArticleService implements IService {
  private articleRepository: ArticleRepository;
  private openAIService: OpenAIService;
  private genreRepository: GenreRepository;

  public constructor(
    articleRepository: ArticleRepository,
    openAIService: OpenAIService,
    genreRepository: GenreRepository,
  ) {
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
      items: items.map((article) => article.toObjectWithAuthor()),
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
      items: items.map((article) => article.toObjectWithAuthor()),
    };
  }

  public async find(id: number): Promise<ArticleWithAuthorType | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    return article.toObjectWithAuthor();
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

  public async create(
    payload: ArticleCreateDto,
  ): Promise<ArticleBaseResponseDto> {
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

    return article.toObject();
  }

  public async update(
    id: number,
    {
      payload,
      user,
    }: { payload: ArticleUpdateRequestDto; user: UserAuthResponseDto },
  ): Promise<ArticleBaseResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new ApplicationError({
        message: `Article with id ${id} not found`,
      });
    }

    const updatedReadTime =
      payload.text && payload.text !== article.text
        ? await this.getArticleReadTime(payload.text)
        : article.readTime;

    if (article.userId !== user.id) {
      throw new ForbiddenError('Article can be edited only by author!');
    }

    const updatedArticle = await this.articleRepository.update(
      ArticleEntity.initialize({
        ...article,
        ...payload,
        readTime: updatedReadTime,
      }),
    );

    return updatedArticle.toObjectWithAuthor();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleService };
