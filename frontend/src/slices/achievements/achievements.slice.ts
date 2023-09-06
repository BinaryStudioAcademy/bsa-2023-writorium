import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getAll } from 'src/slices/achievements/actions.js';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type AchievementBaseResponseDto } from '~/packages/achievements/achievements.js';

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
    builder.addMatcher(isAnyOf(getAll.fulfilled), (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.achievements = action.payload.items;
    });
    builder.addMatcher(isAnyOf(getAll.pending), (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addMatcher(isAnyOf(getAll.rejected), (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
