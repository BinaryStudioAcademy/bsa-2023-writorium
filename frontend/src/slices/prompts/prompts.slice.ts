import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type GenerateArticlePromptResponseDto as GeneratedPrompt } from '~/packages/prompts/prompts.js';

import { generatePrompt } from './actions.js';

type State = {
  generatedPrompt: GeneratedPrompt | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  generatedPrompt: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'prompts',
  reducers: {
    resetPrompts(state) {
      state.generatedPrompt = initialState.generatedPrompt;
      state.dataStatus = DataStatus.IDLE;
    },
    setPromptFromLocalStorage(state, action: PayloadAction<GeneratedPrompt>) {
      state.generatedPrompt = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(generatePrompt.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(generatePrompt.fulfilled, (state, action) => {
      state.generatedPrompt = action.payload;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(generatePrompt.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
