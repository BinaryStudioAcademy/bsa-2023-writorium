import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserAuthResponseDto as User } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import {
  getCurrentUser,
  loginWithGoogle,
  logout,
  resetPassword,
  sendEmailResetPasswordLink,
  signIn,
  signInWithFacebook,
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
    builder.addCase(sendEmailResetPasswordLink.fulfilled, (state) => {
      state.dataStatus = DataStatus.FULFILLED;
    });
    builder.addCase(sendEmailResetPasswordLink.rejected, (state) => {
      state.dataStatus = DataStatus.REJECTED;
    });
    builder.addMatcher(
      isAnyOf(
        signUp.pending,
        signIn.pending,
        sendEmailResetPasswordLink.pending,
        resetPassword.pending,
        signInWithFacebook.pending,
        loginWithGoogle.pending,
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
        signInWithFacebook.rejected,
        loginWithGoogle.rejected,
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
        signInWithFacebook.fulfilled,
        loginWithGoogle.fulfilled,
      ),
      (state, action) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.user = action.payload;
      },
    );
  },
});

export { actions, name, reducer };
