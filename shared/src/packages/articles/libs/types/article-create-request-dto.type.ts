type ArticleCreateRequestDto = {
  title: string;
  text: string;
  promptId?: number;
  genreId: number;
  publishedAt: string | null;
};

export { type ArticleCreateRequestDto };
