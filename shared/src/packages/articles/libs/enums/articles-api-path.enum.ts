const ArticlesApiPath = {
  ROOT: '/',
  $ID: '/:id',
  REACT: '/react',
  OWN: '/own',
  SHARE: '/:id/share',
  SHARED_BASE: '/shared',
  SHARED: '/shared/:token',
} as const;

export { ArticlesApiPath };
