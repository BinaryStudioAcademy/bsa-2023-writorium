const DatabaseTableName = {
  MIGRATIONS: 'migrations',
  ARTICLES: 'articles',
  ARTICLE_REACTIONS: 'article_reactions',
  USERS: 'users',
  FILES: 'files',
  USER_DETAILS: 'user_details',
  USER_FOLLOWING_AUTHORS: 'user_following_authors',
  COMMENTS: 'comments',
  ACHIEVEMENTS: 'achievements',
  GENRES: 'genres',
  PROMPTS: 'prompts',
  FAVOURED_USER_ARTICLES: 'favoured_user_articles',
} as const;

export { DatabaseTableName };
