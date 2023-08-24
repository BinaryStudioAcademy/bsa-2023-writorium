import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
  const { authApi, storage } = extra;
  const response = await authApi.signUp(registerPayload);
  await storage.set(StorageKey.TOKEN, response.token);

  return response;
});

const signIn = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
  const { authApi, storage } = extra;
  const response = await authApi.signIn(loginPayload);
  await storage.set(StorageKey.TOKEN, response.token);

  return response;
});

export { signIn, signUp };
