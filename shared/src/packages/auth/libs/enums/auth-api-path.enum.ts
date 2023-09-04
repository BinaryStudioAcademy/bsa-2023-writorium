const AuthApiPath = {
  ROOT: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  CURRENT: '/current',
  FORGOTTEN_PASSWORD: '/send-forgotten-password',
  RESET_PASSWORD: '/reset-password',
  GOOGLE: '/google',
} as const;

export { AuthApiPath };
