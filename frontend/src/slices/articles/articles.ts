import {
  createArticle,
  fetchAll,
  fetchOwn,
  getArticle,
  reactToArticle,
} from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  getArticle,
  reactToArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
