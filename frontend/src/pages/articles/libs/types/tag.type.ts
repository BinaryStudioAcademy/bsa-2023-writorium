import { type PromptCategory } from 'shared/build/packages/prompts/prompts.js';

import { type ValueOf } from '~/libs/types/types.js';

type TagType = {
  category: ValueOf<typeof PromptCategory>;
  text: string;
};

export { type TagType };
