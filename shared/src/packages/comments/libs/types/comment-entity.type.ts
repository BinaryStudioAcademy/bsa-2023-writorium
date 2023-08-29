type CommentEntityType = {
  id: number;
  text: string;
  userId: number;
  articleId: number;
  publishedAt: string | null;
};

export { type CommentEntityType };
