import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserActivityResponseDto,
  type UserArticlesGenreStatsResponseDto,
  type UserAuthResponseDto,
  type UserDetailsDto,
  type UserGetAllResponseDto,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './users.slice.js';

const loadAll = createAsyncThunk<
  UserGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getAll();
});

const getUserActivity = createAsyncThunk<
  UserActivityResponseDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-user-activity`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getUserActivity();
});

const getUserArticlesGenresStats = createAsyncThunk<
  UserArticlesGenreStatsResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-user-articles-genres-stats`, (_, { extra }) => {
  const { userApi } = extra;

  return userApi.getUserArticlesGenresStats();
});

const updateUser = createAsyncThunk<
  UserAuthResponseDto,
  UserUpdateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/users`, async (updateUserPayload, { extra }) => {
  const { userApi } = extra;

  return await userApi.updateUser(updateUserPayload);
});

const getAllAuthors = createAsyncThunk<
  UserDetailsDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/getAllAuthors`, async (_loginPayload, { extra }) => {
  const { userApi } = extra;
  return await userApi.getAllAuthors();
});

export {
  getAllAuthors,
  getUserActivity,
  getUserArticlesGenresStats,
  loadAll,
  updateUser,
};
