import { createSlice } from '@reduxjs/toolkit';

import { type AppRoute } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { navigate } from './actions.js';

type State = {
  navigateTo: ValueOf<typeof AppRoute> | null;
};

const initialState: State = {
  navigateTo: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'app',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(navigate, (state, action) => {
      state.navigateTo = action.payload;
    });
  },
});

export { actions, name, reducer };
