import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { notification } from '~/packages/notification/notification.js';
import { type UserAuthResponseDto as User } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import {
  emailResetPasswordLink,
  getCurrentUser,
  logout,
  resetPassword,
  signIn,
  signUp,
} from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  user: User | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder.addCase(usersActions.updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(emailResetPasswordLink.fulfilled, (state) => {
      state.dataStatus = DataStatus.FULFILLED;
      notification.success(
        'Email with reset password link was send to your email address',
      );
    });
    builder.addCase(emailResetPasswordLink.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addMatcher(
      isAnyOf(
        signUp.pending,
        signIn.pending,
        emailResetPasswordLink.pending,
        resetPassword.pending,
      ),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );

    builder.addMatcher(
      isAnyOf(
        signIn.rejected,
        signUp.rejected,
        getCurrentUser.rejected,
        logout.rejected,
        resetPassword.rejected,
      ),
      (state) => {
        state.dataStatus = DataStatus.REJECTED;
        state.user = null;
      },
    );
    builder.addMatcher(
      isAnyOf(
        logout.fulfilled,
        signUp.fulfilled,
        signIn.fulfilled,
        getCurrentUser.fulfilled,
        resetPassword.fulfilled,
      ),
      (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.user = action.payload;
      },
    );
  },
});

export { actions, name, reducer };
