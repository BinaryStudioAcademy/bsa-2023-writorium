const ArticleSortingKey = {
  DRAFTED: 'articles.createdAt',
  PUBLISHED: 'articles.publishedAt',
  UPDATED: 'articles.updatedAt',
} as const;

export { ArticleSortingKey };
