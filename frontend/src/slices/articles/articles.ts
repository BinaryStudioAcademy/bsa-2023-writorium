import { createArticle, fetchAll, fetchOwn, shareArticle } from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  shareArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
