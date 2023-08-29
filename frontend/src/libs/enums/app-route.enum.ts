const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  ARTICLES: '/articles',
  ARTICLE: '/articles/:id',
  FEED: 'feed',
  MY_ARTICLES: 'my-articles',
} as const;

export { AppRoute };
