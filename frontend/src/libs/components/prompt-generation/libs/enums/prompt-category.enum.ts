import { type ValueOf } from '~/libs/types/types.js';

const PromptCategory = {
  CHARACTER: 'character',
  SITUATION: 'situation',
  SETTING: 'setting',
  PROP: 'prop',
  GENRE: 'genre',
} as const;

type PromptCategoryValue = ValueOf<typeof PromptCategory>;

export { PromptCategory, type PromptCategoryValue };
