const AuthApiPath = {
  ROOT: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  SIGN_IN_FACEBOOK: '/sign-in/facebook',
  CURRENT: '/current',
  FORGOTTEN_PASSWORD: '/send-forgotten-password',
  RESET_PASSWORD: '/reset-password',
  GOOGLE: '/google',
} as const;

export { AuthApiPath };
