import { type ValueOf } from '~/libs/types/types.js';
import {
  type PromptCategory,
  type PromptType,
} from '~/packages/prompts/prompts.js';

type Prompt = {
  id: number;
  [PromptCategory.CHARACTER]: string | null;
  [PromptCategory.SETTING]: string | null;
  [PromptCategory.SITUATION]: string | null;
  [PromptCategory.PROP]: string | null;
  type: ValueOf<typeof PromptType>;
  genreId: number | null;
};

export { type Prompt };
