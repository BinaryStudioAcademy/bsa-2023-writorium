import {
  getAllAuthors,
  getUserActivity,
  loadAll,
  updateUser,
} from './actions.js';
import { actions } from './users.slice.js';

const allActions = {
  ...actions,
  loadAll,
  updateUser,
  getUserActivity,
  getAllAuthors,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
