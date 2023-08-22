import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserAuthRequestDto,
  type UserAuthResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { name as sliceName } from './auth.slice.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(`${sliceName}/sign-up`, (registerPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(registerPayload);
});

const signIn = createAsyncThunk<
  UserAuthResponseDto,
  UserAuthRequestDto,
  AsyncThunkConfig
  >(`${sliceName}/sign-in`, (loginPayload, { extra }) => {
    const { authApi } = extra;

    return authApi.signIn(loginPayload);
  });

export { signIn, signUp };
