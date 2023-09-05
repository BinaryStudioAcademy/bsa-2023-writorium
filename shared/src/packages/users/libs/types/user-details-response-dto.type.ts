import { type UserDetailsDto } from './types.js';

type UserDetailsResponseDto = Omit<UserDetailsDto, 'id'>;

export { type UserDetailsResponseDto };
