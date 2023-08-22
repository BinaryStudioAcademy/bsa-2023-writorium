import { NotFoundError } from '~/libs/packages/exceptions/exceptions.js';
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
  ):Promise<UserSignInResponseDto> {
    const user = await this.userService.findByEmail(userRequestDto.email);
    
    if (!user) {
      throw new NotFoundError({ 
        message: 'User not found', 
        cause: 'No user email in the database' 
      });
    }

    return user;
  }

  public signIn(
    userRequestDto: UserSignInResponseDto,
  ):Promise<UserAuthResponseDto> {
    const mockedUserResponse: UserAuthResponseDto = {
      id: userRequestDto.id,
      email: userRequestDto.email,
      firstName: 'Test',
      lastName: 'User',
    };
    return Promise.resolve({
      ...mockedUserResponse,
    });
  }

  public signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return this.userService.create(userRequestDto);
  }
}

export { AuthService };
