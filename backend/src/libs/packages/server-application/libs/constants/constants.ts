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
  {
    routerPath: '/*',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation/static/*',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation/static/swagger-initializer.js',
    methods: ['GET'],
  },
  {
    routerPath: '/v1/documentation/json',
    methods: ['GET'],
  },
];

export { WHITE_ROUTES };
