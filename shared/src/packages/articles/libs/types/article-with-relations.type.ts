import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleEntityInstance } from './article-entity-instance.type.js';
import { type ReactionResponseDto } from './reaction-response-dto.type.js';

type ArticleWithRelations = ArticleEntityInstance & {
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

export { type ArticleWithRelations };
