import {
  createArticle,
  deleteArticle,
  fetchAll,
  fetchOwn,
  getArticle,
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
  deleteArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
