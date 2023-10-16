import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import { type UserGetAllResponseDto } from '~/packages/users/users.js';

import { name as sliceName } from './users.slice.js';

const loadAll = createAsyncThunk<
  UserGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getAll();
});

export { loadAll };
