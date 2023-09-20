// eslint-disable-next-line simple-import-sort/imports
import { fetchOwnWithProgress } from './actions.js';
import { actions } from './achievements.slice.js';

const allActions = {
  ...actions,
  fetchOwnWithProgress,
};

export { allActions as actions };
export { reducer } from '~/slices/achievements/achievements.slice.js';
