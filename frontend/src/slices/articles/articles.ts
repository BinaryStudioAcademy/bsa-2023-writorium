import {
  createArticle,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getArticle,
  shareArticle,
} from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  getArticle,
  shareArticle,
  fetchSharedArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
