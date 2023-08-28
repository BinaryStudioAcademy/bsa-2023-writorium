import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import {
  InvalidCredentialsError,
  UserNotFoundError,
} from '~/libs/packages/exceptions/exceptions.js';
import { token as accessToken } from '~/libs/packages/token/token.js';
import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type UserPrivateData } from '../users/libs/types/types.js';

class AuthService {
  private userService: UserService;

  private encrypt: IEncrypt;

  public constructor(userService: UserService, encrypt: IEncrypt) {
    this.userService = userService;
    this.encrypt = encrypt;
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

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const user = await this.userService.create(userRequestDto);

    const token = await accessToken.create<{ userId: number }>({
      userId: user.id,
    });

    return { user, token };
  }
}

export { AuthService };
