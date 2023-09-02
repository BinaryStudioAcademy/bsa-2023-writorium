import { createArticle, fetchAll, fetchOwn } from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
