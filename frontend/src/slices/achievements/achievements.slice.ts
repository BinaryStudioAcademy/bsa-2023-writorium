import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';

import { fetchOwnWithProgress } from './actions.js';

type State = {
  ownAchievements: AchievementWithProgressResponseDto[];
  ownAchievementsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  ownAchievements: [],
  ownAchievementsDataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'achievements',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOwnWithProgress.fulfilled, (state, action) => {
      state.ownAchievementsDataStatus = DataStatus.FULFILLED;
      state.ownAchievements = action.payload;
    });
    builder.addCase(fetchOwnWithProgress.pending, (state) => {
      state.ownAchievementsDataStatus = DataStatus.PENDING;
    });
    builder.addCase(fetchOwnWithProgress.rejected, (state) => {
      state.ownAchievementsDataStatus = DataStatus.REJECTED;
    });
  },
});

export { actions, name, reducer };
