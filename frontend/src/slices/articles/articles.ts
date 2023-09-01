import { createArticle, loadAll } from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  loadAll,
  createArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
