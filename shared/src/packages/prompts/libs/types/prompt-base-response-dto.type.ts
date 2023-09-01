import { type Prompt } from './prompt.type.js';

type PromptBaseResponseDto = Pick<
  Prompt,
  'id' | 'character' | 'setting' | 'situation' | 'prop' | 'type' | 'genreId'
>;

export { type PromptBaseResponseDto };
