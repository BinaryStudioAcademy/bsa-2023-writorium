type CommentEntityType = {
  id: number;
  text: string;
  userId: number;
  articleId: number;
  createdAt: string | undefined;
};

export { type CommentEntityType };
