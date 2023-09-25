import { type ValueOf } from '~/libs/types/types.js';
import { type PromptCategory } from '~/packages/prompts/prompts.js';

type TagType = {
  category: ValueOf<typeof PromptCategory>;
  text: string;
};

export { type TagType };
