import {
  createArticle,
  fetchAll,
  fetchOwn,
  getAllAuthors,
  getAllGenres,
  getArticle,
} from './actions.js';
import { actions } from './articles.slice.js';

const allActions = {
  ...actions,
  fetchAll,
  fetchOwn,
  createArticle,
  getArticle,
  getAllGenres,
  getAllAuthors,
};

export { allActions as actions };
export { reducer } from './articles.slice.js';
