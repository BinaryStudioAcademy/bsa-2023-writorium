import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ArticleBaseResponseDto } from './article-base-response-dto.type.js';

type ArticleGetAllResponseDto = {
  items: ArticleBaseResponseDto[] & { userDetails?: UserDetailsResponseDto }[];
};

export { type ArticleGetAllResponseDto };
