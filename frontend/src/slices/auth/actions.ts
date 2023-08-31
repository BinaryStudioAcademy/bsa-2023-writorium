import { createAsyncThunk } from '@reduxjs/toolkit';

import { StorageKey } from '~/libs/packages/storage/storage.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
} from '~/packages/auth/auth.js';
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
    return await authApi.getCurrentUser();
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

const sendEmailResetPasswordLink = createAsyncThunk<
  unknown,
  AuthRequestPasswordDto,
  AsyncThunkConfig
>(`${sliceName}/email-reset-password-link`, async (payload, { extra }) => {
  const { authApi } = extra;

  return await authApi.sendEmailResetPasswordLink(payload);
});

const resetPassword = createAsyncThunk<
  UserAuthResponseDto,
  AuthResetPasswordDto,
  AsyncThunkConfig
>(`${sliceName}/reset-password`, async (payload, { extra }) => {
  const { authApi, storage } = extra;

  const { token, user } = await authApi.resetPassword(payload);

  await storage.set(StorageKey.TOKEN, token);

  return user;
});

export {
  getCurrentUser,
  logout,
  resetPassword,
  sendEmailResetPasswordLink,
  signIn,
  signUp,
};
