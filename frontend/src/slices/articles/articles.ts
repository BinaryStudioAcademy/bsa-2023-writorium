import {
  createArticle,
  createComment,
  deleteArticle,
  deleteArticleReaction,
  fetchAll,
  fetchAllCommentsToArticle,
  fetchOwn,
  fetchSharedArticle,
  getAllGenres,
  getArticle,
  reactToArticle,
  setShowFavourites,
  shareArticle,
  toggleIsFavourite,
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
  getAllGenres,
  fetchAllCommentsToArticle,
  createComment,
  updateComment,
  deleteArticle,
  reactToArticle,
  deleteArticleReaction,
  shareArticle,
  fetchSharedArticle,
  toggleIsFavourite,
  setShowFavourites,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
