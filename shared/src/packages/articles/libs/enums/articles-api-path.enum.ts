import { SHARED_$TOKEN } from '~/libs/constants/constants.js';

const ArticlesApiPath = {
  ROOT: '/',
  $ID: '/:id',
  REACT: '/react',
  OWN: '/own',
  $ID_SHARE: '/:id/share',
  SHARED_BASE: '/shared',
  SHARED_$TOKEN: SHARED_$TOKEN,
} as const;

export { ArticlesApiPath };
