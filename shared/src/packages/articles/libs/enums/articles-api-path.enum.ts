const ArticlesApiPath = {
  ROOT: '/',
  $ID: '/:id',
  REACT: '/react',
  OWN: '/own',
  SHARE: '/:id/share',
  TOKEN: '/shared',
} as const;

export { ArticlesApiPath };
