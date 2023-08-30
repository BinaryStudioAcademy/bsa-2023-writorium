import { loadAll, updateUser } from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  loadAll,
  updateUser,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
