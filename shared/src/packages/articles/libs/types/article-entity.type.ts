type ArticleEntityType = {
  id: number;
  title: string;
  text: string;
  userId: number;
  promptId: number | null;
  genreId: number | null;
  coverId: number | null;
  publishedAt: string | null;
  deletedAt: string | null;
};

export { type ArticleEntityType };
