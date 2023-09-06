import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { differenceInDays, safeJSONParse } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/service.interface.js';
import { type OpenAIService } from '~/libs/packages/openai/openai.package.js';

import { GenreEntity } from '../genres/genre.entity.js';
import { type GenreRepository } from '../genres/genre.repository.js';
import { ArticleEntity } from './article.entity.js';
import { type ArticleRepository } from './article.repository.js';
import { DateFormat } from './libs/enums/enums.js';
import {
  getDetectArticleGenreCompletionConfig,
  getFormattedDate,
  subMonths,
} from './libs/helpers/helpers.js';
import {
  type ArticleBaseResponseDto,
  type ArticleCreateDto,
  type ArticleGetAllResponseDto,
  type ArticleUpdateRequestDto,
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

  public async detectArticleGenreFromText(
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

  public async findAll(): Promise<ArticleGetAllResponseDto> {
    const articles = await this.articleRepository.findAll({});

    return { items: articles.map((article) => article.toObjectWithAuthor()) };
  }

  public async findOwn(userId: number): Promise<ArticleGetAllResponseDto> {
    const articles = await this.articleRepository.findAll({ userId });

    return { items: articles.map((article) => article.toObjectWithAuthor()) };
  }

  public async find(id: number): Promise<ArticleBaseResponseDto | null> {
    const article = await this.articleRepository.find(id);

    if (!article) {
      return null;
    }

    return article.toObject();
  }

  public async getUserActivity(
    userId: number,
  ): Promise<UserActivityResponseDto> {
    const currentDate = new Date();
    const sixMonthAgo = subMonths(currentDate, 6);
    const daysInHalfYear = differenceInDays(currentDate, sixMonthAgo);
    const halfYearActivity: UserActivityResponseDto = [];

    const userActivity = await this.articleRepository.getUserActivity({
      userId,
      activityFrom: sixMonthAgo.toISOString(),
      activityTo: currentDate.toISOString(),
    });

    for (let index = 0; index <= daysInHalfYear; index++) {
      const dateForStatistic = new Date(
        sixMonthAgo.getFullYear(),
        sixMonthAgo.getMonth(),
        sixMonthAgo.getDate() + index,
      ).toISOString();

      const activeDayIndex = userActivity.findIndex((activity) => {
        return (
          getFormattedDate(activity.date, DateFormat.YEAR_MONTH_DATE) ===
          getFormattedDate(dateForStatistic, DateFormat.YEAR_MONTH_DATE)
        );
      });

      if (activeDayIndex >= 0) {
        const dayActivity = userActivity[activeDayIndex];
        halfYearActivity.push({
          date: dayActivity.date,
          count: Number(dayActivity.count),
        });
        continue;
      }

      halfYearActivity.push({ date: dateForStatistic, count: 0 });
    }

    return halfYearActivity;
  }

  public async create(
    payload: ArticleCreateDto,
  ): Promise<ArticleBaseResponseDto> {
    const genreId = await this.getGenreIdToSet(payload);

    const article = await this.articleRepository.create(
      ArticleEntity.initializeNew({
        genreId,
        title: payload.title,
        text: payload.text,
        userId: payload.userId,
        promptId: payload?.promptId ?? null,
        publishedAt: payload?.publishedAt ?? null,
      }),
    );

    return article.toObject();
  }

  public async update(
    id: number,
    payload: ArticleUpdateRequestDto,
  ): Promise<ArticleBaseResponseDto> {
    const article = await this.find(id);

    if (!article) {
      throw new ApplicationError({
        message: `Article with id ${id} not found`,
      });
    }

    const updatedArticle = await this.articleRepository.update(
      ArticleEntity.initialize({
        ...article,
        ...payload,
      }),
    );

    return updatedArticle.toObject();
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

export { ArticleService };
