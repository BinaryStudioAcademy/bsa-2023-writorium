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
  articlesFiltersValidationSchema,
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
 *            type: string
 *            format: date-time
 *            nullable: true
 *            example: 2023-08-26T11:21:14.994Z
 *          author:
 *            readOnly: true
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *          reactions:
 *            readOnly: true
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  format: int64
 *                  minimum: 1
 *                  example: 1234
 *                isLike:
 *                  type: boolean
 *                userId:
 *                  type: integer
 *                  format: int64
 *                  minimum: 1
 *                  example: 8564
 *
 */

class ArticleController extends Controller {
  private articleService: ArticleService;

  public constructor(logger: ILogger, articleService: ArticleService) {
    super(logger, ApiPath.ARTICLES);

    this.articleService = articleService;

    this.addRoute({
      path: ArticlesApiPath.ROOT,
      method: 'GET',
      validation: {
        query: articlesFiltersValidationSchema,
      },
      handler: (options) => {
        return this.findAll(
          options as ApiHandlerOptions<{ query: ArticlesFilters }>,
        );
      },
    });

    this.addRoute({
      path: ArticlesApiPath.OWN,
      method: 'GET',
      validation: {
        query: articlesFiltersValidationSchema,
      },
      handler: (options) => {
        return this.findOwn(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            query: ArticlesFilters;
          }>,
        );
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
            user: UserAuthResponseDto;
          }>,
        ),
    });
    this.addRoute({
      path: ArticlesApiPath.EDIT,
      method: 'PUT',
      validation: {
        body: articleUpdateValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: { id: number };
            body: ArticleUpdateRequestDto;
            user: UserAuthResponseDto;
          }>,
        ),
    });

    this.addRoute({
      path: ArticlesApiPath.$ID,
      method: 'GET',
      handler: (options) => {
        return this.find(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        );
      },
    });

    this.addRoute({
      path: ArticlesApiPath.$ID,
      method: 'DELETE',
      handler: (options) => {
        return this.delete(
          options as ApiHandlerOptions<{
            params: { id: number };
            user: UserAuthResponseDto;
          }>,
        );
      },
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
   * /articles/own:
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
      user: UserAuthResponseDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.update(options.params.id, {
        payload: options.body,
        user: options.user,
      }),
    };
  }

  /**
   * @swagger
   * /articles/:id:
   *    get:
   *      description: Get an existing article by id
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Article'
   */
  private async find(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.find(options.params.id),
    };
  }

  /**
   * @swagger
   * /articles/:id:
   *    delete:
   *      summary: Delete an existing article
   *      description: Delete an existing article by id
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: integer
   *          required: true
   *          description: The ID of the article to delete
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Article'
   */

  private async delete(
    options: ApiHandlerOptions<{
      params: { id: number };
      user: UserAuthResponseDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleService.delete(
        options.params.id,
        options.user.id,
      ),
    };
  }
}

export { ArticleController };
