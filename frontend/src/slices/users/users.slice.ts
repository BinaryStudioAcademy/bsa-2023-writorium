import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type UserActivityResponseDto,
  type UserArticlesGenreStatsItem,
  type UserDetailsAuthorResponseDto,
  type UserGetAllItemResponseDto,
} from '~/packages/users/users.js';

import {
  getAllAuthors,
  getUserActivity,
  getUserArticlesGenresStats,
  loadAll,
} from './actions.js';

type State = {
  users: UserGetAllItemResponseDto[];
  userActivities: UserActivityResponseDto[];
  dataStatus: ValueOf<typeof DataStatus>;
  authors: UserDetailsAuthorResponseDto[];
  userArticlesGenresStats: UserArticlesGenreStatsItem[];
  userArticlesGenresStatsStatus: ValueOf<typeof DataStatus>;
  userActivitiesDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  users: [],
  userActivities: [],
  authors: [],
  userArticlesGenresStats: [],
  dataStatus: DataStatus.IDLE,
  userArticlesGenresStatsStatus: DataStatus.IDLE,
  userActivitiesDataStatus: DataStatus.IDLE,
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
      state.userActivities = action.payload;
      state.userActivitiesDataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.authors = action.payload;
    });
    builder.addCase(getAllAuthors.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
      state.authors = [];
    });
    builder.addCase(getUserArticlesGenresStats.fulfilled, (state, action) => {
      state.userArticlesGenresStats = action.payload.items;
      state.userArticlesGenresStatsStatus = DataStatus.FULFILLED;
    });
    builder.addCase(getUserArticlesGenresStats.pending, (state) => {
      state.userArticlesGenresStatsStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserActivity.pending, (state) => {
      state.userActivitiesDataStatus = DataStatus.PENDING;
    });
    builder.addCase(getUserArticlesGenresStats.rejected, (state) => {
      state.userArticlesGenresStatsStatus = DataStatus.REJECTED;
    });
    builder.addCase(getUserActivity.rejected, (state) => {
      state.userActivitiesDataStatus = DataStatus.REJECTED;
    });
    builder.addCase(loadAll.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addMatcher(
      isAnyOf(loadAll.pending, getAllAuthors.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export { actions, name, reducer };
