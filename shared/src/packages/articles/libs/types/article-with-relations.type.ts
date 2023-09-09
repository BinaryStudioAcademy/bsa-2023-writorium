import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleEntityType } from './article-entity.type.js';
import { type ReactionResponseDto } from './reaction-response-dto.type.js';

type ArticleWithRelationsType = ArticleEntityType & {
  author?: UserDetailsResponseDto;
  reactions?: ReactionResponseDto[];
};

export { type ArticleWithRelationsType };
