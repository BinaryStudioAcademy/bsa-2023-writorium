import { type UserAuthResponseDto } from './user-auth-response-dto.type.js';

type UserSignUpResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignUpResponseDto };
