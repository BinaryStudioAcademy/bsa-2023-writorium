import { type ValueOf } from '~/libs/types/types.js';
import { type PromptCategory } from '~/packages/prompts/prompts.js';

type Tag = {
  category: ValueOf<typeof PromptCategory>;
  text: string;
};

export { type Tag };
