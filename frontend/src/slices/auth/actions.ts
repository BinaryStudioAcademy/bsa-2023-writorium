import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserAuthResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;

  const { token, user } = await authApi.signUp(registerPayload);

  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const signIn = createAsyncThunk<
  UserAuthResponseDto,
  UserSignInRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
  const { authApi, storage } = extra;
  const { user, token } = await authApi.signIn(loginPayload);

  await storage.set(StorageKey.TOKEN, token);

  return user;
});

const getCurrentUser = createAsyncThunk<
  UserAuthResponseDto | null,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/getCurrentUser`, async (_loginPayload, { extra }) => {
  const { authApi, storage } = extra;

  const token = await storage.get(StorageKey.TOKEN);
  const hasToken = Boolean(token);

  if (!hasToken) {
    return null;
  }

  try {
    return await authApi.getCurentUser();
  } catch {
    await storage.drop(StorageKey.TOKEN);

    return null;
  }
});

const logout = createAsyncThunk<null, undefined, AsyncThunkConfig>(
  `${sliceName}/logout`,
  async (_loginPayload, { extra }) => {
    const { storage } = extra;
    await storage.drop(StorageKey.TOKEN);
    return null;
  },
);

export { getCurrentUser, logout, signIn, signUp };
