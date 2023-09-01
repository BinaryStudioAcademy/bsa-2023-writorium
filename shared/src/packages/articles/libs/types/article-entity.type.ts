import { type UserDetailsResponseDto } from '~/packages/users/users.js';

type ArticleEntityType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  promptId: number | null;
  genreId: number | null;
  publishedAt: string | null;
  userDetails?: UserDetailsResponseDto;
};

export { type ArticleEntityType };
