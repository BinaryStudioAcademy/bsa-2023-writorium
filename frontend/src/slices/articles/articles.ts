import {
  createArticle,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getArticle,
  shareArticle,
  updateArticle,
} from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  updateArticle,
  getArticle,
  shareArticle,
  fetchSharedArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
