import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/users.js';

import { AuthActionType } from './common.js';

const signUp = createAsyncThunk<
  UserSignUpResponseDto,
  UserSignUpRequestDto,
  AsyncThunkConfig
>(AuthActionType.SIGNUP, (registerPayload, { extra }) => {
  const { authApi } = extra;

  return authApi.signUp(registerPayload);
});

export { signUp };
