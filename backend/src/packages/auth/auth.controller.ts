import { ApiPath, ExceptionMessage } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { BadRequestError } from '~/libs/packages/exceptions/exceptions.js';
import { HttpCode } from '~/libs/packages/http/http.js';
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
  type AuthLoginWithGoogleDto,
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
  type UserSignInWithFacebookResponseDto,
} from './libs/types/types.js';
import {
  loginWithGoogleValidationSchema,
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
      path: AuthApiPath.FACEBOOK,
      method: 'POST',
      handler: (options) =>
        this.signInWithFacebook(
          options as ApiHandlerOptions<{
            body: UserSignInWithFacebookResponseDto;
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

    this.addRoute({
      path: AuthApiPath.GOOGLE,
      method: 'POST',
      validation: {
        body: loginWithGoogleValidationSchema,
      },
      handler: (options) =>
        this.loginWithGoogle(
          options as ApiHandlerOptions<{
            body: AuthLoginWithGoogleDto;
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
   *                $ref: '#/components/schemas/UserSignUpRequest'
   *      responses:
   *        201:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                  payload:
   *                    type: object
   *                      user:
   *                        $ref: '#/components/schemas/UserResponse'
   *                      token:
   *                        type: string
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
   *                $ref: '#/components/schemas/UserSignInRequest'
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  status:
   *                    type: string
   *                  payload:
   *                    type: object
   *                      user:
   *                        $ref: '#/components/schemas/UserResponse'
   *                      token:
   *                        type: string
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

  private async signInWithFacebook(
    options: ApiHandlerOptions<{
      body: UserSignInWithFacebookResponseDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.authService.signInWithFacebook(options.body),
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
      throw new BadRequestError(ExceptionMessage.UNSPECIFIED_REQUEST_ORIGIN);
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

  private async loginWithGoogle(
    options: ApiHandlerOptions<{
      body: AuthLoginWithGoogleDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.authService.loginWithGoogle(options.body),
    };
  }
}

export { AuthController };
