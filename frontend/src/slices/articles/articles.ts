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
  getImprovementSuggestions,
  getImprovementSuggestionsBySession,
  reactToArticle,
  setShowFavourites,
  shareArticle,
  toggleIsFavourite,
  updateArticle,
  updateArticleAuthorFollowInfo,
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
  getImprovementSuggestions,
  getImprovementSuggestionsBySession,
  updateArticleAuthorFollowInfo,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
