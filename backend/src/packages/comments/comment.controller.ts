import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type CommentService } from '~/packages/comments/comment.service.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { CommentsApiPath } from './libs/enums/enums.js';
import {
  type CommentBaseRequestDto,
  type CommentGetAllRequestDto,
  type CommentUpdateRequestDto,
} from './libs/types/types.js';
import {
  commentCreateValidationSchema,
  commentUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Comment:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            example: 10
 *            readOnly: true
 *          text:
 *            type: string
 *            minLength: 50
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
 *          publishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2023-08-26T11:21:14.994Z
 */

class CommentController extends Controller {
  private commentService: CommentService;

  public constructor(logger: ILogger, commentService: CommentService) {
    super(logger, ApiPath.COMMENTS);

    this.commentService = commentService;

    this.addRoute({
      path: CommentsApiPath.ROOT,
      method: 'GET',
      handler: (options) =>
        this.findAllByArticleId(
          options as ApiHandlerOptions<{
            body: CommentGetAllRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: CommentsApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.findOneByCommentId(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: CommentsApiPath.ROOT,
      method: 'POST',
      validation: {
        body: commentCreateValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
            body: CommentBaseRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: CommentsApiPath.$ID,
      method: 'PATCH',
      validation: {
        body: commentUpdateValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            params: { id: number };
            body: CommentUpdateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: CommentsApiPath.$ID,
      method: 'DELETE',
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /comments:
   *    get:
   *      summary: Return array of comments that belong to an article
   *      description: Return array of all comments that belong to an article with provided Id
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Comment'
   */

  private async findAllByArticleId(
    options: ApiHandlerOptions<{
      body: { articleId: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.commentService.findAllByArticleId(
        options.body.articleId,
      ),
    };
  }

  /**
   * @swagger
   * /comments/:id:
   *    get:
   *      summary: Return an existing comment
   *      description: Return comment by provided comment id
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Comment'
   */

  private async findOneByCommentId(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.commentService.find(options.params.id),
    };
  }

  /**
   * @swagger
   * /comments/:
   *    post:
   *      summary: Add a new comment
   *      description: Add a new comment
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Create a new comment
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Comment'
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Comment'
   */
  private async create(
    options: ApiHandlerOptions<{
      user: UserAuthResponseDto;
      body: CommentBaseRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.commentService.create({
        userId: options.user.id,
        ...options.body,
      }),
    };
  }

  /**
   * @swagger
   * /comments/:id:
   *    patch:
   *      summary: Update an existing comment
   *      description: Update an existing comment by id
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Create a new comment
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Comment'
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Comment'
   */
  private async update(
    options: ApiHandlerOptions<{
      params: { id: number };
      body: CommentUpdateRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.commentService.update(
        options.params.id,
        options.body,
      ),
    };
  }

  /**
   * @swagger
   * /comments/:id:
   *    delete:
   *      summary: Delete an existing comment
   *      description: Delete an existing comment by id
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Comment'
   */
  private async delete(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.commentService.delete(options.params.id),
    };
  }
}

export { CommentController };
