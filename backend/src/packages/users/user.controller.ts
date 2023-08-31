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
import { userUpdateValidationSchema } from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            readOnly: true
 *          email:
 *            type: string
 *            format: email
 *          firstName:
 *             type: string
 *          lastName:
 *              type: string
 *          avatarUrl:
 *              type: string
 *              nullable: true
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
      path: UsersApiPath.ROOT,
      method: 'PUT',
      validation: { body: userUpdateValidationSchema },
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
   *                  $ref: '#/components/schemas/User'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.userService.findAll(),
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
   *              type: object
   *              properties:
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *                email:
   *                  type: string
   *                avatarId:
   *                  type: number
   *                  nullable: true
   *
   *      responses:
   *        200:
   *          description: Successful update
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
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
