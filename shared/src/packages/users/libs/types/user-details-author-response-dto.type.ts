import { type UserDetailsDto } from './user-details-dto.type.js';

type UserDetailsAuthorResponseDto = UserDetailsDto & {
  userId: number;
};

export { type UserDetailsAuthorResponseDto };
