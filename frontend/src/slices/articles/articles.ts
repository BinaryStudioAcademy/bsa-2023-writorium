import { createArticle, fetchAll, fetchOwn, updateArticle } from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  updateArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
