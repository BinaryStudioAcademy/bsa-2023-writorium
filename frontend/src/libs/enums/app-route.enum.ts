import { SHARED_$TOKEN } from '../constants/constants.js';
import { ResetPasswordRoute } from '../enums/enums.js';

const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  ARTICLES: '/articles',
  ARTICLES_MY_ARTICLES: '/articles/my-articles',
  ARTICLES_$ID: '/articles/:id',
  ARTICLES_SHARED_$TOKEN: `/articles${SHARED_$TOKEN}`,
  CREATE_ARTICLE: '/articles/create',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD_$TOKEN: ResetPasswordRoute.WITH_PARAM,
  ARTICLES_EDIT_$ID: '/articles/edit/:id',
} as const;

export { AppRoute };
