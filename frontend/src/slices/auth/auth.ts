import {
  getCurrentUser,
  loginWithGoogle,
  logout,
  resetPassword,
  sendEmailResetPasswordLink,
  signIn,
  signInWithFacebook,
  signUp,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signIn,
  signUp,
  getCurrentUser,
  logout,
  sendEmailResetPasswordLink,
  resetPassword,
  signInWithFacebook,
  loginWithGoogle,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
