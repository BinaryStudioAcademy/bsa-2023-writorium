import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type UserAuthRequestDto, type UserSignUpRequestDto } from '~/packages/users/users.js';
import { userSignInValidationSchema, userSignUpValidationSchema } from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';

class AuthController extends Controller {
  private authService: AuthService;

  public constructor(logger: ILogger, authService: AuthService) {
    super(logger, ApiPath.AUTH);

    this.authService = authService;

    this.addRoute({
      path: AuthApiPath.SIGN_IN,
      method: 'POST',
      validation: {
        body: userSignInValidationSchema,
      },
      handler: (options) =>
        this.signIn(
          options as ApiHandlerOptions<{
            body: UserAuthRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: AuthApiPath.SIGN_UP,
      method: 'POST',
      validation: {
        body: userSignUpValidationSchema,
      },
      handler: (options) =>
        this.signUp(
          options as ApiHandlerOptions<{
            body: UserSignUpRequestDto;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /auth/sign-up:
   *    post:
   *      description: Sign up user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   * /auth/sign-in:
   *    post:
   *      description: Sign in user into the system
   *      requestBody:
   *        description: User auth data
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                email:
   *                  type: string
   *                  format: email
   *                password:
   *                  type: string
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  message:
   *                    type: object
   *                    $ref: '#/components/schemas/User'
   */
  
  private async signIn(
    options: ApiHandlerOptions<{
      body: UserAuthRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const user = await this.authService.verifySignInCredentials(options.body);
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(user),
    };
  }

  private async signUp(
    options: ApiHandlerOptions<{
      body: UserSignUpRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.signUp(options.body),
    };
  }
}

export { AuthController };
