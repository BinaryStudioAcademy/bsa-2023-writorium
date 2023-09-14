import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type CommentEntityType } from './comment-entity.type.js';

type CommentWithRelationsResponseDto = CommentEntityType & {
  author: UserDetailsResponseDto;
};

export { type CommentWithRelationsResponseDto };
