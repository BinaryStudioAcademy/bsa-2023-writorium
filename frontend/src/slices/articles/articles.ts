import {
  createArticle,
  deleteArticleReaction,
  fetchAll,
  fetchOwn,
  fetchSharedArticle,
  getAllAuthors,
  getAllGenres,
  getArticle,
  reactToArticle,
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
  getAllGenres,
  getAllAuthors,
  reactToArticle,
  deleteArticleReaction,
  shareArticle,
  fetchSharedArticle,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
