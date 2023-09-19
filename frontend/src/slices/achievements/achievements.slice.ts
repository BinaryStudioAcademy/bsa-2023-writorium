import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type AchievementBaseResponseDto,
  type AchievementWithProgressResponseDto,
} from '~/packages/achievements/achievements.js';

import { fetchAll, fetchOwnWithProgress } from './actions.js';

type State = {
  achievements: AchievementBaseResponseDto[];
  ownAchievements: AchievementWithProgressResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  ownAchievementsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  achievements: [],
  ownAchievements: [],
  dataStatus: DataStatus.IDLE,
  ownAchievementsDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'achievements',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAll.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.achievements = action.payload.items;
    });
    builder.addCase(fetchOwnWithProgress.fulfilled, (state, action) => {
      state.ownAchievementsDataStatus = DataStatus.FULFILLED;
      state.ownAchievements = action.payload;
    });
    builder.addCase(fetchAll.pending, (state) => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(fetchOwnWithProgress.pending, (state) => {
      state.ownAchievementsDataStatus = DataStatus.PENDING;
    });
    builder.addCase(fetchAll.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addCase(fetchOwnWithProgress.rejected, (state) => {
      state.ownAchievementsDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
