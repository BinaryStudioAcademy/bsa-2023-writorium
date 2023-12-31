import {
  ExceptionMessage,
  ResetPasswordRoute,
  TokenExpirationTime,
} from '~/libs/enums/enums.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '~/libs/packages/exceptions/exceptions.js';
import { facebookAuth } from '~/libs/packages/facebook-auth/facebook-auth.js';
import { googleAuthClient } from '~/libs/packages/google-auth-client/google-auth-client.js';
import {
  type Mailer,
  type SendEmailResponse,
} from '~/libs/packages/mailer/mailer.js';
import { token as accessToken } from '~/libs/packages/token/token.js';
import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type UserPrivateData } from '../users/libs/types/types.js';
import {
  type AuthLoginWithGoogleDto,
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
  type UserSignInWithFacebookResponseDto,
} from './libs/types/types.js';

class AuthService {
  private userService: UserService;
  private mailer: Mailer;

  private encrypt: IEncrypt;

  public constructor(
    userService: UserService,
    encrypt: IEncrypt,
    mailer: Mailer,
  ) {
    this.userService = userService;
    this.encrypt = encrypt;
    this.mailer = mailer;
  }

  public async signIn(
    userSignInDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const { email, password } = userSignInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundError(ExceptionMessage.USER_NOT_FOUND);
    }

    const userPrivateData = (await this.userService.findPrivateData(
      user.id,
    )) as UserPrivateData;

    const hasSamePassword = await this.encrypt.compare({
      passwordToCompare: password,
      salt: userPrivateData.passwordSalt,
      passwordHash: userPrivateData.passwordHash,
    });

    if (!hasSamePassword) {
      throw new BadRequestError(ExceptionMessage.INVALID_CREDENTIALS);
    }

    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }
  public async signInWithFacebook(
    userSignInDto: UserSignInWithFacebookResponseDto,
  ): Promise<UserSignInResponseDto> {
    const isValidFacebookAccessToken =
      await facebookAuth.verifyFacebookAccessToken(userSignInDto.accessToken);

    if (!isValidFacebookAccessToken) {
      throw new UnauthorizedError(ExceptionMessage.INVALID_TOKEN);
    }

    const { email } = userSignInDto;

    if (!email) {
      throw new BadRequestError(ExceptionMessage.INVALID_USER_INFO_NO_EMAIL);
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundError(ExceptionMessage.USER_NOT_FOUND);
    }

    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const userAlreadyExists = await this.userService.findByEmail(
      userRequestDto.email,
    );

    if (userAlreadyExists) {
      throw new ForbiddenError(ExceptionMessage.EMAIL_IS_ALREADY_USED);
    }

    const user = await this.userService.create(userRequestDto);
    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }

  public async sendEmailResetPasswordLink(
    authRequestPasswordDto: AuthRequestPasswordDto,
    url: string,
  ): Promise<SendEmailResponse> {
    const { email } = authRequestPasswordDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundError(ExceptionMessage.USER_NOT_FOUND);
    }
    const token = await accessToken.create<{ userId: number }>(
      {
        userId: user.id,
      },
      TokenExpirationTime.ONE_HOUR,
    );

    const resetLink = `${url}${ResetPasswordRoute.BASE}/${token}`;

    return await this.mailer.sendResetPasswordEmail(email, resetLink);
  }

  public async resetPassword(
    authResetPasswordDto: AuthResetPasswordDto,
  ): Promise<UserSignUpResponseDto> {
    const { resetPasswordToken } = authResetPasswordDto;
    const { userId } = await accessToken.verifyToken<{ userId?: number }>(
      resetPasswordToken,
    );

    if (!userId) {
      throw new UnauthorizedError(ExceptionMessage.INVALID_TOKEN);
    }

    const user = await this.userService.updatePassword(
      userId,
      authResetPasswordDto,
    );
    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }
  public async loginWithGoogle(
    authLoginWithGoogleDto: AuthLoginWithGoogleDto,
  ): Promise<UserSignInResponseDto> {
    const userInfo = await googleAuthClient.getUserInfo(
      authLoginWithGoogleDto.code,
    );

    if (!userInfo) {
      throw new BadRequestError(ExceptionMessage.INVALID_CODE);
    }
    if (!userInfo.email) {
      throw new BadRequestError(ExceptionMessage.INVALID_USER_INFO_NO_EMAIL);
    }

    const user = await this.userService.findByEmail(userInfo.email);
    if (!user) {
      throw new NotFoundError(ExceptionMessage.USER_NOT_FOUND);
    }
    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }
}

export { AuthService };
