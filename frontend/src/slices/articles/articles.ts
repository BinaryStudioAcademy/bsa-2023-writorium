import {
  createArticle,
  deleteArticle,
  deleteArticleReaction,
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
  deleteArticle,
  reactToArticle,
  deleteArticleReaction,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
