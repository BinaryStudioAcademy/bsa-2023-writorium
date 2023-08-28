import { UserNotFoundError } from '~/libs/packages/exceptions/exceptions.js';
import { token as accessToken } from '~/libs/packages/token/token.js';
import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async signIn(
    userSignInDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const { email } = userSignInDto;

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
}

export { AuthService };
