import {
  type UserDetailsResponseDto,
  type UserFollowResponseDto,
} from '~/packages/users/users.js';

import { type ArticleWithRelations } from './article-with-relations.type.js';

type ArticleWithFollowResponseDto = Omit<ArticleWithRelations, 'author'> & {
  author: UserDetailsResponseDto & Omit<UserFollowResponseDto, 'authorId'>;
};

export { type ArticleWithFollowResponseDto };
