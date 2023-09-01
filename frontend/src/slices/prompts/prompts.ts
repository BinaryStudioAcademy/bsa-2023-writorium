import { createPrompt, generatePrompt } from './actions.js';
import { actions } from './prompts.slice.js';

const allActions = {
  ...actions,
  generatePrompt,
  createPrompt,
};

export { allActions as actions };
export { reducer } from './prompts.slice.js';
