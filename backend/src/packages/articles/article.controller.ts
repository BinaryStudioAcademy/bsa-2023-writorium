import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type ArticleService } from '~/packages/articles/article.service.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleCreateRequestDto,
  type ArticleUpdateRequestDto,
} from './libs/types/types.js';
import {
  articleCreateValidationSchema,
  articleUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

const MOCK_USER_ID = 1; // substitute here the id of an existing user in the database

class ArticleController extends Controller {
  private articleService: ArticleService;

  public constructor(logger: ILogger, articleService: ArticleService) {
    super(logger, ApiPath.ARTICLES);

    this.articleService = articleService;

    this.addRoute({
      path: ArticlesApiPath.ROOT,
      method: 'POST',
      validation: {
        body: articleCreateValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: ArticleCreateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: ArticlesApiPath.$ID,
      method: 'PUT',
      validation: {
        body: articleUpdateValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: { id: number };
            body: ArticleUpdateRequestDto;
          }>,
        ),
    });
  }

  private async create(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto /** @todo uncomment when authorizationPlugin will be ready */;
      body: ArticleCreateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.articleService.create({
        /** @todo replace with real implementation */
        /** @todo uncomment when authorizationPlugin will be ready */
        // userId: options.user.id
        userId: MOCK_USER_ID,
        ...options.body,
      }),
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      params: { id: number };
      body: ArticleUpdateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.update(
        options.params.id,
        options.body,
      ),
    };
  }
}

export { ArticleController };
