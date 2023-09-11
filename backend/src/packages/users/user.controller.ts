import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type UserService } from '~/packages/users/user.service.js';

import { UsersApiPath } from './libs/enums/enums.js';
import {
  type UserAuthResponseDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';
import { userUpdateWithAvatarIdValidationSchema } from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *            readOnly: true
 *          email:
 *           $ref: '#/components/schemas/EmailPattern'
 *          firstName:
 *            $ref: '#/components/schemas/NamePattern'
 *          lastName:
 *            $ref: '#/components/schemas/NamePattern'
 *          avatarUrl:
 *            type: string
 *            nullable: true
 *          avatarId:
 *            type: number
 *            nullable: true
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *      UserResponse:
 *        type: object
 *        properties:
 *         id:
 *           type: number
 *           format: number
 *           minimum: 1
 *           readOnly: true
 *         email:
 *           $ref: '#/components/schemas/EmailPattern'
 *         firstName:
 *           $ref: '#/components/schemas/NamePattern'
 *         lastName:
 *           $ref: '#/components/schemas/NamePattern'
 *         avatarUrl:
 *            type: string
 *            nullable: true
 *         avatarId:
 *            type: number
 *            nullable: true
 *      UserUpdateRequest:
 *        type: object
 *        properties:
 *         email:
 *           $ref: '#/components/schemas/EmailPattern'
 *         firstName:
 *           $ref: '#/components/schemas/NamePattern'
 *         lastName:
 *           $ref: '#/components/schemas/NamePattern'
 *         avatarId:
 *            type: number
 *            nullable: true
 *      UserSignUpRequest:
 *        type: object
 *        properties:
 *         email:
 *           $ref: '#/components/schemas/EmailPattern'
 *         password:
 *           $ref: '#/components/schemas/PasswordPattern'
 *         firstName:
 *           $ref: '#/components/schemas/NamePattern'
 *         lastName:
 *           $ref: '#/components/schemas/NamePattern'
 *      UserSignInRequest:
 *        type: object
 *        properties:
 *         email:
 *           $ref: '#/components/schemas/EmailPattern'
 *         password:
 *           $ref: '#/components/schemas/PasswordPattern'
 *      NamePattern:
 *        type: string
 *        pattern: "^[ A-Za-z-]+$"
 *        description: Must match the specified regex pattern.
 *        minLength: 1
 *        maxLength: 64
 *      EmailPattern:
 *        type: string
 *        format: email
 *        pattern: "^(?=.{1,64}@.{1,255}$)[\w.-]+(?<!\.)(?<!\.\.)@[\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*$"
 *        description: The email address of the user. Must match the specified regex pattern.
 *      PasswordPattern:
 *        type: string
 *        pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%&()*+,.:;<=>?@[\]^_{}~-])[\w!#$%&()*+,.:;<=>?@^{}~-]$"
 *        description: Must match the specified regex pattern.
 *        minLength: 4
 *        maxLength: 20
 */

class UserController extends Controller {
  private userService: UserService;

  public constructor(logger: ILogger, userService: UserService) {
    super(logger, ApiPath.USERS);

    this.userService = userService;

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });

    this.addRoute({
      path: UsersApiPath.ACTIVITY,
      method: 'GET',
      handler: (options) =>
        this.getUserActivity(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.ARTICLES_GENRES_STATS,
      method: 'GET',
      handler: (options) =>
        this.getUserArticlesGenresStats(
          options as ApiHandlerOptions<{
            user: UserAuthResponseDto;
          }>,
        ),
    });

    this.addRoute({
      path: UsersApiPath.ROOT,
      method: 'PUT',
      validation: {
        body: userUpdateWithAvatarIdValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: UserUpdateRequestDto;
            user: UserAuthResponseDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /users:
   *    get:
   *      description: Returns an array of users
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/UserResponse'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.findAll(),
    };
  }

  /**
   * @swagger
   * /users/activity:
   *    get:
   *      summary: Get user activity statistic
   *      description: Get user activity statistic
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: 'shared/src/packages/users/libs/types/user-activity-response-dto.type.ts'
   */
  private async getUserActivity(
    options: ApiHandlerOptions<{ user: UserAuthResponseDto }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.getUserActivity(options.user.id),
    };
  }

  /**
   * @swagger
   * /users/articles-genres-stats:
   *    get:
   *      summary: Get articles genres stats for current user
   *      description: Get articles genres stats for current user
   *      responses:
   *        200:
   *          description: Successful operation
   */
  private async getUserArticlesGenresStats(
    options: ApiHandlerOptions<{ user: UserAuthResponseDto }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.getUserArticlesGenresStats(
        options.user.id,
      ),
    };
  }

  /**
   * @swagger
   * /users:
   *    put:
   *      summary: Update an existing User
   *      description: Updating user info.
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        description: Updating user info
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserUpdateRequest'

   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/UserResponse'
   */
  private async update(
    options: ApiHandlerOptions<{
      body: UserUpdateRequestDto;
      user: UserAuthResponseDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.update(options.user.id, options.body),
    };
  }
}

export { UserController };
