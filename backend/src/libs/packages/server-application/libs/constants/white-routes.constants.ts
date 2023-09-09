import { ApiPath, AuthApiPath } from '~/libs/enums/enums.js';

import { type WhiteRoute } from '../types/types.js';

const STRING_WHITE_ROUTES: readonly WhiteRoute<string>[] = [
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.FORGOTTEN_PASSWORD}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.RESET_PASSWORD}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.GOOGLE}`,
    methods: ['POST'],
  },
  {
    routerPath: `/api/v1${ApiPath.AUTH}${AuthApiPath.FACEBOOK}`,
    methods: ['POST'],
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
  {
    routerPath: '/api/v1/articles/shared/*',
    methods: ['GET'],
  },
];

const WHITE_ROUTES: readonly WhiteRoute[] = STRING_WHITE_ROUTES.map(
  ({ methods, routerPath }: WhiteRoute<string>) => {
    return {
      routerPath: new RegExp(routerPath),
      methods,
    };
  },
);

export { WHITE_ROUTES };
