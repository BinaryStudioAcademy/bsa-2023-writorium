import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleEntityType } from './article-entity.type.js';

type ArticleWithAuthorType = ArticleEntityType & {
  author?: UserDetailsResponseDto;
  prompt?: {
    character: string;
    setting: string;
    situation: string;
    prop: string;
  };
  genre?: string;
};

export { type ArticleWithAuthorType };
