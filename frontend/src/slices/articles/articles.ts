import { createArticle, shareArticle } from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  createArticle,
  shareArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
