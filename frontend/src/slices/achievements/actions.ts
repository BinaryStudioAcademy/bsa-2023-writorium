import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type AchievementWithProgressResponseDto } from '~/packages/achievements/achievements.js';

import { name as sliceName } from './achievements.slice.js';

const fetchOwnWithProgress = createAsyncThunk<
  AchievementWithProgressResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-own-with-progress`, (_, { extra }) => {
  const { achievementsApi } = extra;

  return achievementsApi.fetchOwnWithProgress();
});

export { fetchOwnWithProgress };
