import { type UserDetailsResponseDto } from '~/packages/users/users.js';

type ArticleEntityType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  promptId: number | null;
  genreId: number | null;
  publishedAt: string | null;
  author?: UserDetailsResponseDto;
};

export { type ArticleEntityType };
