import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '~/packages/users/users.js';

import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
} from './libs/types/types.js';
import {
  requestPasswordValidationSchema,
  resetPasswordValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

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
            body: UserSignInRequestDto;
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
    this.addRoute({
      path: AuthApiPath.CURRENT,
      method: 'GET',
      handler: (options) => this.getCurrentUser(options),
    });
    this.addRoute({
      path: AuthApiPath.FORGOTTEN_PASSWORD,
      method: 'POST',
      handler: (options) =>
        this.sendEmailResetPasswordLink(
          options as ApiHandlerOptions<{ body: AuthRequestPasswordDto }>,
        ),
      validation: {
        body: requestPasswordValidationSchema,
      },
    });
    this.addRoute({
      path: AuthApiPath.RESET_PASSWORD,
      method: 'POST',
      handler: (options) =>
        this.resetPassword(
          options as ApiHandlerOptions<{ body: AuthResetPasswordDto }>,
        ),
      validation: {
        body: resetPasswordValidationSchema,
      },
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
   *                firstName:
   *                  type: string
   *                lastName:
   *                  type: string
   *
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
      body: UserSignInRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signIn(options.body),
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

  private getCurrentUser(options: ApiHandlerOptions): ApiHandlerResponse {
    return {
      status: HttpCode.OK,
      payload: options.user,
    };
  }

  private async sendEmailResetPasswordLink(
    options: ApiHandlerOptions<{
      body: AuthRequestPasswordDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const { origin, body } = options;

    if (!origin) {
      throw new HttpError({
        message: 'Unspecified request origin!',
        status: HttpCode.BAD_REQUEST,
      });
    }
    const url = origin as string;
    return {
      status: HttpCode.OK,
      payload: await this.authService.sendEmailResetPasswordLink(body, url),
    };
  }

  private async resetPassword(
    options: ApiHandlerOptions<{
      body: AuthResetPasswordDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.resetPassword(options.body),
    };
  }
}

export { AuthController };
