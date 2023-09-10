import { SHARED_$TOKEN } from '~/libs/constants/constants.js';

const ArticlesApiPath = {
  ROOT: '/',
  $ID: '/:id',
  REACT: '/react',
  OWN: '/own',
  $ID_SHARE: '/:id/share',
  SHARED_$TOKEN: SHARED_$TOKEN,
} as const;

export { ArticlesApiPath };
