import { ApiPath, AuthApiPath } from '~/libs/enums/enums.js';

import { type WhiteRoute } from '../types/types.js';

const WHITE_ROUTES: WhiteRoute[] = [
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    methods: ['POST'],
  },
];

export { WHITE_ROUTES };
