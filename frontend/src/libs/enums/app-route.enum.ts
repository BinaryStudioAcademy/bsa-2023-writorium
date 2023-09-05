import { RESET_PASSWORD_ROUTE } from '../constants/constants.js';

const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  ARTICLES: '/articles',
  ARTICLE: '/articles/:id',
  CREATE_ARTICLE: '/articles/create',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: RESET_PASSWORD_ROUTE.WITH_PARAM,
} as const;

export { AppRoute };
