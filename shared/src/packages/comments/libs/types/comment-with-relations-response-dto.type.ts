import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type CommentEntityInstance } from './comment-entity-instance.type.js';

type CommentWithRelationsResponseDto = CommentEntityInstance & {
  author: UserDetailsResponseDto;
};

export { type CommentWithRelationsResponseDto };
