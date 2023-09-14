import { type ValueOf } from '~/libs/types/types.js';
import { type PromptCategory } from '~/packages/prompts/libs/enums/enums.js';

type TagType = {
  category: ValueOf<typeof PromptCategory>;
  text: string;
};

export { type TagType };
