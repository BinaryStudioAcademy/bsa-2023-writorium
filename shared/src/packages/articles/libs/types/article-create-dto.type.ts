type ArticleCreateDto = {
  title: string;
  text: string;
  userId: number;
  promptId?: number;
  genreId: number;
  publishedAt?: string;
};

export { type ArticleCreateDto };
