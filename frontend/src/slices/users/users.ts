import {
  getAllAuthors,
  getUserActivity,
  getUserArticlesGenresStats,
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
  getUserArticlesGenresStats,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
