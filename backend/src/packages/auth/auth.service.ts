import { RESET_PASSWORD_ROUTE } from '~/libs/constants/constants.js';
import { TokenExpirationTime } from '~/libs/enums/enums.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import {
  InvalidCredentialsError,
  UserNotFoundError,
} from '~/libs/packages/exceptions/exceptions.js';
import { facebookAuth } from '~/libs/packages/facebook-auth/facebook-auth.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
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
      throw new UserNotFoundError();
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
      throw new InvalidCredentialsError();
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
      throw new HttpError({
        message: 'Invalid token',
        status: HttpCode.BAD_REQUEST,
      });
    }

    const { email } = userSignInDto;

    if (!email) {
      throw new InvalidCredentialsError();
    }

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
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
      throw new UserNotFoundError();
    }
    const token = await accessToken.create<{ userId: number }>(
      {
        userId: user.id,
      },
      TokenExpirationTime.ONE_HOUR,
    );

    const resetLink = `${url}${RESET_PASSWORD_ROUTE.BASE}/${token}`;

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
      throw new HttpError({
        message: 'Invalid token',
        status: HttpCode.UNAUTHORIZED,
      });
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
}

export { AuthService };
