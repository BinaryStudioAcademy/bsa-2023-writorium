import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { parseJSONSafely } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type AchievementWithParsedDescription,
  type ParsedAchievementDescription,
} from '~/packages/achievements/achievements.js';

import { fetchOwnWithProgress } from './actions.js';

type State = {
  ownAchievements: AchievementWithParsedDescription[];
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
      const achievementsWithParsedDescription = action.payload.map(
        (achievement) => {
          const parsedDescription = parseJSONSafely(
            achievement.description,
          ) as ParsedAchievementDescription;

          return {
            ...achievement,
            description: parsedDescription,
          };
        },
      );

      state.ownAchievementsDataStatus = DataStatus.FULFILLED;
      state.ownAchievements = achievementsWithParsedDescription;
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
