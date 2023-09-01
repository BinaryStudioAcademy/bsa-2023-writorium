import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type GenerateArticlePromptResponseDto as generatedPrompt,
  type PromptBaseResponseDto as createdPrompt,
} from '~/packages/prompts/prompts.js';

import { createPrompt, generatePrompt } from './actions.js';

type State = {
  createdPrompt: createdPrompt | null;
  generatedPrompt: generatedPrompt | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  createdPrompt: null,
  generatedPrompt: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'prompts',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(generatePrompt.fulfilled, (state, action) => {
      state.generatedPrompt = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(createPrompt.fulfilled, (state, action) => {
      state.createdPrompt = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addMatcher(
      isAnyOf(generatePrompt.pending, createPrompt.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(generatePrompt.rejected, createPrompt.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
