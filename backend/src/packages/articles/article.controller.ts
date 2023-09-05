import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { token as articleToken } from '~/libs/packages/token/token.js';
import { type ArticleService } from '~/packages/articles/article.service.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleRequestDto,
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
      handler: () => this.findAll(),
    });

    this.addRoute({
      path: ArticlesApiPath.OWN,
      method: 'GET',
      handler: (options) =>
        this.findOwn(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        ),
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

    this.addRoute({
      path: ArticlesApiPath.SHARE,
      method: 'GET',
      handler: (options) =>
        this.share(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: ArticlesApiPath.TOKEN,
      method: 'POST',
      handler: (options) =>
        this.encryptShared(
          options as ApiHandlerOptions<{
            body: { token: string };
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /articles:
   *    get:
   *      description: Returns an array of articles
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Article'
   */

  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.findAll(),
    };
  }

  /**
   * @swagger
   * /articles/:id:
   *    get:
   *      description: Returns an array of user's articles
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Article'
   */

  private async findOwn(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.findOwn(options.user.id),
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

  /**
   * @swagger
   * /articles/:id:
   *    get:
   *      summary: Get articles token for sharing
   *      description: Get an existing articles token with id encoded
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        required: false
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Article'
   */
  private async share(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const token = await articleToken.create({
      articleId: options.params.id,
    });

    return {
      status: HttpCode.OK,
      payload: { token: token },
    };
  }

  /**
   * @swagger
   * /articles/shared
   *    get:
   *      summary: Get article encoded from query
   *      description: Get an existing article with id encoded from query
   *      requestBody:
   *        required: true
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Article'
   */
  private async encryptShared(
    options: ApiHandlerOptions<{
      body: { token: string };
    }>,
  ): Promise<ApiHandlerResponse> {
    const encoded = await articleToken.verifyToken(options.body.token);

    return {
      status: HttpCode.OK,
      payload: await this.articleService.find(Number(encoded.articleId)),
    };
  }
}

export { ArticleController };
