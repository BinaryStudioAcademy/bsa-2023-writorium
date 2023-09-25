import {
  getAllAuthors,
  getAuthorFollowersCountAndStatus,
  getUserActivity,
  getUserArticlesGenresStats,
  loadAll,
  toggleFollowAuthor,
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
  toggleFollowAuthor,
  getAuthorFollowersCountAndStatus,
};

export { allActions as actions };
export { reducer } from './users.slice.js';
