import { createToken } from '~/packages/auth/helpers/token/token-helper.helper';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const user = await this.userService.create(userRequestDto);
    const accessToken = createToken({ id: user.id });

    return { ...user, accessToken };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public signIn(user: unknown): unknown {
    const accessToken = createToken({ id: 1 });

    return { accessToken };
  }
}

export { AuthService };
