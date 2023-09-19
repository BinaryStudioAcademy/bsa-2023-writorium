import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleEntityType } from './article-entity.type.js';
import { type ReactionResponseDto } from './reaction-response-dto.type.js';

type ArticleWithRelationsType = ArticleEntityType & {
  author: UserDetailsResponseDto;
  reactions: ReactionResponseDto[];
  prompt: {
    character: string | null;
    setting: string | null;
    situation: string | null;
    prop: string | null;
  } | null;
  genre: string | null;
  coverUrl: string | null;
  isFavourite: boolean;
};

export { type ArticleWithRelationsType };
