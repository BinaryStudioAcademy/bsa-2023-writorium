import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type AchievementBaseResponseDto } from '~/packages/achievements/achievements.js';

import { fetchAll } from './actions.js';

type State = {
  achievements: AchievementBaseResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  achievements: [],
  dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'achievements',
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(isAnyOf(fetchAll.fulfilled), (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.achievements = action.payload.items;
    });
    builder.addMatcher(isAnyOf(fetchAll.pending), (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addMatcher(isAnyOf(fetchAll.rejected), (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
