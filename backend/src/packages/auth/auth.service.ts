import { type ITokenPayload } from '~/libs/interfaces/interfaces.js';
import { UserNotFoundError } from '~/libs/packages/exceptions/exceptions.js';
import {
  createToken,
  verifyToken,
} from '~/packages/auth/helpers/token/token-helper.helper.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
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
  ): Promise<UserAuthResponseDto> {
    const { email } = userSignInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }
    const accessToken = createToken({ id: user.id });

    return { ...user, accessToken };
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const user = await this.userService.create(userRequestDto);
    const accessToken = createToken({ id: user.id });

    return { ...user, accessToken };
  }

  public verifyToken(token: string): ITokenPayload {
    return verifyToken(token);
  }
}

export { AuthService };
