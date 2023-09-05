import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type SendEmailResponse } from '~/libs/packages/mailer/mailer.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
  type UserSignInWithFacebookResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class AuthApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.AUTH, baseUrl, http, storage });
  }

  public async signUp(
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignUpResponseDto>();
  }

  public async signIn(
    payload: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignInResponseDto>();
  }

  public async signInWithFacebook(
    payload: UserSignInWithFacebookResponseDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_IN_FACEBOOK, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignInResponseDto>();
  }

  public async getCurrentUser(): Promise<UserAuthResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.CURRENT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<UserAuthResponseDto>();
  }

  public async sendEmailResetPasswordLink(
    payload: AuthRequestPasswordDto,
  ): Promise<SendEmailResponse> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.FORGOTTEN_PASSWORD, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<SendEmailResponse>();
  }

  public async resetPassword(
    payload: AuthResetPasswordDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.RESET_PASSWORD, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignInResponseDto>();
  }
}

export { AuthApi };
