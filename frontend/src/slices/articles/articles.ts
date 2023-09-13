import {
  createArticle,
  createComment,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  getArticle,
  updateComment,
} from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  getArticle,
  fetchAllCommentsToArticle,
  createComment,
  updateComment,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
