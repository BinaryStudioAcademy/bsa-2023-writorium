import { signUp } from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  signUp,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
