type ArticleEntityType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  promptId: number | null;
  genreId: number;
  publishedAt: string | null;
};

export { type ArticleEntityType };
