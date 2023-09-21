import {
  type UserDetailsResponseDto,
  type UserFollowResponseDto,
} from '~/packages/users/users.js';

import { type ArticleWithRelationsType } from './article-with-relations.type.js';

type ArticleWithFollowResponseDto = Omit<ArticleWithRelationsType, 'author'> & {
  author: UserDetailsResponseDto & Omit<UserFollowResponseDto, 'authorId'>;
};

export { type ArticleWithFollowResponseDto };
