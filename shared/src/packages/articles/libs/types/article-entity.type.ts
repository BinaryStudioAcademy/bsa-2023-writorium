type ArticleEntityType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  promptId: number | null;
  genreId: number | null;
  coverId: number | null;
  publishedAt: string | null;
  readTime: number | null;
};

export { type ArticleEntityType };
