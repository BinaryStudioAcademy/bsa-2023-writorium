import { createSlice } from '@reduxjs/toolkit';

type State = unknown;

const initialState: State = {};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'app',
  reducers: {},
});

export { actions, name, reducer };
