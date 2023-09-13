import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleEntityType } from './article-entity.type.js';

type ArticleWithRelationsType = ArticleEntityType & {
  author: UserDetailsResponseDto;
  prompt: {
    character: string | null;
    setting: string | null;
    situation: string | null;
    prop: string | null;
  } | null;
  genre: string | null;
};

export { type ArticleWithRelationsType };