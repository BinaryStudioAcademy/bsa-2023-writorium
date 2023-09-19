const UsersApiPath = {
  ROOT: '/',
  FOLLOW: '/:id/follow',
  ACTIVITY: '/activity',
  AUTHORS: '/authors',
  ARTICLES_GENRE_STATS: '/articles-genre-stats',
} as const;

export { UsersApiPath };
