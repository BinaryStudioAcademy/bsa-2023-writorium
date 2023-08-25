const PromptCategory = {
  CHARACTER: 'character',
  SITUATION: 'situation',
  SETTING: 'setting',
  PROP: 'prop',
  GENRE: 'genre',
} as const;

type PromptCategoryValue = (typeof PromptCategory)[keyof typeof PromptCategory];

export { PromptCategory, type PromptCategoryValue };
