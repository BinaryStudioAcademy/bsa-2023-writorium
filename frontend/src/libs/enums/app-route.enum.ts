const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  ARTICLES: '/articles',
  ARTICLE: '/articles/:id',
  CREATE_ARTICLE: '/create',
} as const;

export { AppRoute };
