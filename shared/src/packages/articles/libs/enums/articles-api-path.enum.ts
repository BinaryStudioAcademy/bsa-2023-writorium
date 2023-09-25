import { SHARED_$TOKEN } from '~/libs/constants/constants.js';

const ArticlesApiPath = {
  ROOT: '/',
  $ID: '/:id',
  REACT: '/react',
  OWN: '/own',
  ARTICLE_ID: '/article-id',
  $ID_SHARE: '/:id/share',
  SHARED_BASE: '/shared',
  SHARED_$TOKEN: SHARED_$TOKEN,
  EDIT: '/edit/:id',
  FAVORITES: '/favorites/:id',
  $ID_IMPROVEMENT_SUGGESTIONS: '/:id/improvement-suggestions',
} as const;

export { ArticlesApiPath };
