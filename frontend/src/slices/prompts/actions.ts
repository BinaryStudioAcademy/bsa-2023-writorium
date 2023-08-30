import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type PromptBaseResponseDto } from '~/packages/prompts/prompts.js';

import { name as sliceName } from './prompts.slice.js';

const generatePrompt = createAsyncThunk<
  PromptBaseResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/generate`, (_, { extra }) => {
  const { promptApi } = extra;

  return promptApi.generate();
});

export { generatePrompt };
