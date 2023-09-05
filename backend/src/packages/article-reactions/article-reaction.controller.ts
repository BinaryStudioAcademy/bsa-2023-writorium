import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { ArticlesApiPath } from '../articles/libs/enums/enums.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { type ArticleReactionService } from './article-reaction.service.js';
import { type ArticleReactionRequestDto } from './libs/types/types.js';
import { articleReactionValidationSchema } from './libs/validation-schemas/validation-schemas.js';
/**
 * @swagger
 * components:
 *    schemas:
 *      Article reaction:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            example: 10
 *            readOnly: true
 *          isLike:
 *            type: boolean
 *          userId:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            example: 10
 *            readOnly: true
 *          articleId:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            example: 10
 *            readOnly: true
 */

class ArticleReactionController extends Controller {
  private articleReactionService: ArticleReactionService;

  public constructor(
    logger: ILogger,
    articleReactionService: ArticleReactionService,
  ) {
    super(logger, ApiPath.ARTICLES);

    this.articleReactionService = articleReactionService;

    this.addRoute({
      path: ArticlesApiPath.REACT,
      method: 'POST',
      validation: {
        body: articleReactionValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: ArticleReactionRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: ArticlesApiPath.REACT,
      method: 'PUT',
      validation: {
        body: articleReactionValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: ArticleReactionRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /articles/react:
   *    post:
   *      summary: Add a new article reaction
   *      description: Add a new article reaction
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Create a new article reaction
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Article reaction'
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  likeCount:
   *                    type: integer
   *                    format: int64
   *                    minimum: 0
   *                    example: 10
   *                  dislikeCount:
   *                    type: integer
   *                    format: int64
   *                    minimum: 0
   *                    example: 10
   */
  public async create(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
      body: ArticleReactionRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.articleReactionService.create({
        userId: options.user.id,
        ...options.body,
      }),
    };
  }

  /**
   * @swagger
   * /articles/react:
   *    put:
   *      summary: Update or delete an existing article reaction
   *      description: Update or delete an existing article reaction
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Create a new article
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Article reaction'
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  likeCount:
   *                    type: integer
   *                    format: int64
   *                    minimum: 0
   *                    example: 10
   *                  dislikeCount:
   *                    type: integer
   *                    format: int64
   *                    minimum: 0
   *                    example: 10
   */
  public async update(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
      body: ArticleReactionRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.articleReactionService.update(
        options.user.id,
        options.body,
      ),
    };
  }
}

export { ArticleReactionController };
