import {
  createArticle,
  fetchAll,
  fetchOwn,
  getArticle,
  reactToArticle,
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
  reactToArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
