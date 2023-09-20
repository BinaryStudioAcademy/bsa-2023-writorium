const DatabaseTableName = {
  MIGRATIONS: 'migrations',
  ARTICLES: 'articles',
  ARTICLE_REACTIONS: 'article_reactions',
  ARTICLE_VIEWS: 'article_views',
  USERS: 'users',
  FILES: 'files',
  USER_DETAILS: 'user_details',
  COMMENTS: 'comments',
  ACHIEVEMENTS: 'achievements',
  GENRES: 'genres',
  PROMPTS: 'prompts',
  FAVOURED_USER_ARTICLES: 'favoured_user_articles',
} as const;

export { DatabaseTableName };
