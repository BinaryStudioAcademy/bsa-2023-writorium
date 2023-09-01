import { generatePrompt } from './actions.js';
import { actions } from './prompts.slice.js';

const allActions = {
  ...actions,
  generatePrompt,
};

export { allActions as actions };
export { reducer } from './prompts.slice.js';
