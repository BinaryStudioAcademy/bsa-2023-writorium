import { type Prompt } from './prompt.type.js';

type PromptRequestDto = Pick<
  Prompt,
  'character' | 'setting' | 'situation' | 'prop' | 'type'
> & {
  genre: string;
};

export { type PromptRequestDto };
