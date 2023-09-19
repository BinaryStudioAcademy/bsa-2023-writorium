import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type AchievementGetAllResponseDto,
  type AchievementWithProgressResponseDto,
} from '~/packages/achievements/achievements.js';

import { name as sliceName } from './achievements.slice.js';

const fetchAll = createAsyncThunk<
  AchievementGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all`, (_, { extra }) => {
  const { achievementsApi } = extra;

  return achievementsApi.fetchAll();
});

const fetchOwnWithProgress = createAsyncThunk<
  AchievementWithProgressResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-own-with-progress`, (_, { extra }) => {
  const { achievementsApi } = extra;

  return achievementsApi.fetchOwnWithProgress();
});

export { fetchAll, fetchOwnWithProgress };
