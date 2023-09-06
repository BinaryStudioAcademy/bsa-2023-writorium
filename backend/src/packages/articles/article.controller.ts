import {
  DEFAULT_PAGINATION_SKIP,
  DEFAULT_PAGINATION_TAKE,
} from '~/libs/constants/constants.js';
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
  type ArticleRequestDto,
  type ArticlesFilters,
  type ArticleUpdateRequestDto,
} from './libs/types/types.js';
import {
  articleCreateValidationSchema,
  articleUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Article:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            example: 10
 *            readOnly: true
 *          title:
 *            type: string
 *            minLength: 3
 *            maxLength: 30
 *          text:
 *            type: string
 *            minLength: 50
 *          userId:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            example: 10
 *            readOnly: true
 *          promptId:
 *            type: integer
 *            format: int64
 *            nullable: true
 *            example: null
 *          genreId:
 *            type: integer
 *            format: int64
 *            example: 198772
 *          publishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2023-08-26T11:21:14.994Z
 */

class ArticleController extends Controller {
  private articleService: ArticleService;

  public constructor(logger: ILogger, articleService: ArticleService) {
    super(logger, ApiPath.ARTICLES);

    this.articleService = articleService;

    this.addRoute({
      path: ArticlesApiPath.ROOT,
      method: 'GET',
      handler: (options) => {
        const { skip, take } = options.query as {
          [key in keyof ArticlesFilters]?: string;
        };

        return this.findAll({
          query: {
            skip: Number.parseInt(skip ?? '') || DEFAULT_PAGINATION_SKIP,
            take: Number.parseInt(take ?? '') || DEFAULT_PAGINATION_TAKE,
          },
        } as ApiHandlerOptions<{ query: ArticlesFilters }>);
      },
    });

    this.addRoute({
      path: ArticlesApiPath.OWN,
      method: 'GET',
      handler: (options) => {
        const { skip, take } = options.query as {
          [key in keyof ArticlesFilters]?: string;
        };

        return this.findOwn({
          user: options.user,
          query: {
            skip: Number.parseInt(skip ?? '') || DEFAULT_PAGINATION_SKIP,
            take: Number.parseInt(take ?? '') || DEFAULT_PAGINATION_TAKE,
          },
        } as ApiHandlerOptions<{
          user: UserAuthResponseDto;
          query: ArticlesFilters;
        }>);
      },
    });

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
            body: ArticleRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: ArticlesApiPath.$ID,
      method: 'PATCH',
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

  /**
   * @swagger
   * /articles:
   *    get:
   *      description: Returns an array of articles
   *      parameters:
   *        - in: query
   *          name: skip
   *          schema:
   *            type: integer
   *        - in: query
   *          name: take
   *          schema:
   *            type: integer
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  hasMore:
   *                    type: boolean
   *                  total:
   *                    type: integer
   *                  items:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/Article'
   */

  private async findAll(
    options: ApiHandlerOptions<{ query: ArticlesFilters }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.findAll(options.query),
    };
  }

  /**
   * @swagger
   * /articles/:id:
   *    get:
   *      description: Returns an array of user's articles
   *      parameters:
   *        - in: query
   *          name: skip
   *          schema:
   *            type: integer
   *        - in: query
   *          name: take
   *          schema:
   *            type: integer
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  hasMore:
   *                    type: boolean
   *                  total:
   *                    type: integer
   *                  items:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/Article'
   */

  private async findOwn(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
      query: ArticlesFilters;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.findOwn(
        options.user.id,
        options.query,
      ),
    };
  }

  /**
   * @swagger
   * /articles/:
   *    post:
   *      summary: Add a new article
   *      description: Add a new article
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Create a new article
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Article'
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Article'
   */
  private async create(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
      body: ArticleRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.articleService.create({
        userId: options.user.id,
        ...options.body,
      }),
    };
  }

  /**
   * @swagger
   * /articles/:id:
   *    put:
   *      summary: Update an existing article
   *      description: Update an existing article by id
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Create a new article
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Article'
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Article'
   */
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
