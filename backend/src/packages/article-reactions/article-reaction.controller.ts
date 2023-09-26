import { ApiPath } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { SocketNamespace, SocketRoom } from '~/libs/packages/socket/socket.js';
import { type SocketService } from '~/libs/packages/socket/socket.package.js';

import { ArticlesApiPath } from '../articles/libs/enums/enums.js';
import { type UserAuthResponseDto } from '../users/users.js';
import { type ArticleReactionService } from './article-reaction.service.js';
import { ArticleReactionsSocketEvent } from './libs/enums/enums.js';
import {
  type ArticleReactionRequestDto,
  type ArticleReactionsSocketEventPayload,
} from './libs/types/types.js';
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
 */
type Constructor = {
  logger: ILogger;
  articleReactionService: ArticleReactionService;
  socketService: SocketService;
};

class ArticleReactionController extends Controller {
  private articleReactionService: ArticleReactionService;
  private socketService: SocketService;

  public constructor({
    logger,
    articleReactionService,
    socketService,
  }: Constructor) {
    super(logger, ApiPath.ARTICLES);

    this.articleReactionService = articleReactionService;
    this.socketService = socketService;

    this.addRoute({
      path: ArticlesApiPath.REACT,
      method: 'POST',
      validation: {
        body: articleReactionValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: ArticleReactionRequestDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: ArticlesApiPath.REACT,
      method: 'PUT',
      validation: {
        body: articleReactionValidationSchema,
      },
      handler: (options) => {
        return this.update(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: ArticleReactionRequestDto;
          }>,
        );
      },
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
   *                $ref: '#/components/schemas/Article reaction'
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
   *      summary: Create, update or delete an existing article reaction
   *      description: Create, update or delete an existing article reaction
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Change an article reaction
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
   *                $ref: '#/components/schemas/Article reaction'
   */
  public async update(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
      body: ArticleReactionRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const reaction = await this.articleReactionService.update(
      options.user.id,
      options.body,
    );

    const socketEventPayload: ArticleReactionsSocketEventPayload[typeof ArticleReactionsSocketEvent.NEW_REACTION] =
      reaction;

    this.socketService.io
      .of(SocketNamespace.REACTIONS)
      .to([
        SocketRoom.ARTICLES_FEED,
        configureString(SocketRoom.ARTICLE_$ID, {
          id: String(options.body.articleId),
        }),
      ])
      .emit(ArticleReactionsSocketEvent.NEW_REACTION, socketEventPayload);

    return {
      status: HttpCode.OK,
      payload: reaction,
    };
  }
}

export { ArticleReactionController };
