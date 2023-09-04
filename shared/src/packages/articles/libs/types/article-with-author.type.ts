import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleEntityType } from './article-entity.type.js';

type ArticleWithAuthorType = ArticleEntityType & {
  author?: UserDetailsResponseDto;
};

export { type ArticleWithAuthorType };
