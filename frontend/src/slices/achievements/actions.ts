import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type AchievementGetAllResponseDto } from '~/packages/achievements/achievements.js';

import { name as sliceName } from './achievements.slice.js';

const getAll = createAsyncThunk<
  AchievementGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all`, (_, { extra }) => {
  const { achievementsApi } = extra;

  return achievementsApi.getAll();
});

export { getAll };
