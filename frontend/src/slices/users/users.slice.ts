import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type UserActivityResponseDto,
  type UserArticlesGenresStatsItem,
  type UserGetAllItemResponseDto,
} from '~/packages/users/users.js';

import {
  getUserActivity,
  getUserArticlesGenresStats,
  loadAll,
} from './actions.js';

type State = {
  users: UserGetAllItemResponseDto[];
  userActivity: UserActivityResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  userArticlesGenresStats: UserArticlesGenresStatsItem[];
  userArticlesGenresStatsStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  users: [],
  userActivity: [],
  userArticlesGenresStats: [],
  dataStatus: DataStatus.IDLE,
  userArticlesGenresStatsStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadAll.fulfilled, (state, action) => {
      state.users = action.payload.items;
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getUserActivity.fulfilled, (state, action) => {
      state.userActivity = action.payload;
    });
    builder.addCase(getUserArticlesGenresStats.fulfilled, (state, action) => {
      state.userArticlesGenresStats = action.payload.items;
      state.userArticlesGenresStatsStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getUserArticlesGenresStats.pending, (state) => {
      state.userArticlesGenresStatsStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserArticlesGenresStats.rejected, (state) => {
      state.userArticlesGenresStatsStatus = DataStatus.REJECTED;
    });
    builder.addMatcher(
      isAnyOf(loadAll.pending, getUserActivity.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
    builder.addMatcher(
      isAnyOf(loadAll.rejected, getUserActivity.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
      },
    );
  },
});

export { actions, name, reducer };
