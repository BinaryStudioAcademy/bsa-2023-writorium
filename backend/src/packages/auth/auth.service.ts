import { UserNotFoundError } from '~/libs/packages/exceptions/exceptions.js';
import {
  type UserAuthResponseDto,
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

  public async verifySignInCredentials(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.userService.findByEmail(userRequestDto.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  public async signIn(
    userSignInDto: UserSignInRequestDto,
  ):Promise<UserAuthResponseDto> {
    const { email } = userSignInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  public signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return this.userService.create(userRequestDto);
  }
}

export { AuthService };
