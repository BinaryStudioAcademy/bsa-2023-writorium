import { type UserAuthResponseDto } from './user-auth-response-dto.type.js';

type UserSignInResponseDto = {
  user: UserAuthResponseDto;
  token: string;
};

export { type UserSignInResponseDto };
