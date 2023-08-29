const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  ARTICLE: '/articles/:id',
} as const;

export { AppRoute };
