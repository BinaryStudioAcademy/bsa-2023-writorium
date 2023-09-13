import {
  createArticle,
  createComment,
  deleteArticleReaction,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  fetchSharedArticle,
  getArticle,
  reactToArticle,
  shareArticle,
  updateArticle,
  updateComment,
} from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  updateArticle,
  getArticle,
  fetchAllCommentsToArticle,
  createComment,
  updateComment,
  reactToArticle,
  deleteArticleReaction,
  shareArticle,
  fetchSharedArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
