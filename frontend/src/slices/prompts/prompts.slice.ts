import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type PromptBaseResponseDto as Prompt } from '~/packages/prompts/prompts.js';

import { generatePrompt } from './actions.js';

type State = {
  prompt: Prompt | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  prompt: null,
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'prompt',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(generatePrompt.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    // builder.addCase(generatePrompt.fulfilled, (state, action) => {
    //   const { prompt } = action.payload;
    //   state.prompt = { ...prompt };
    //   state.dataStatus = DataStatus.FULFILLED;
    // });
    builder.addCase(generatePrompt.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };