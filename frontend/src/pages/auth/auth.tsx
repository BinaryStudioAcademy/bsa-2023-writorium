import { useGoogleLogin } from '@react-oauth/google';
import { matchPath } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import {
  type AuthRequestPasswordDto,
  type AuthResetPasswordDto,
  type UserSignInWithFacebookResponseDto,
} from '~/packages/auth/auth.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import {
  AuthLayout,
  ForgotPasswordForm,
  ResetPasswordForm,
  SignInForm,
  SignUpForm,
} from './components/components.js';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload)).unwrap();
    },
    [dispatch],
  );
  const handleForgotPasswordSubmit = useCallback(
    (payload: AuthRequestPasswordDto): void => {
      void dispatch(authActions.sendEmailResetPasswordLink(payload));
    },
    [dispatch],
  );
  const handleResetPasswordSubmit = useCallback(
    (payload: AuthResetPasswordDto): void => {
      void dispatch(authActions.resetPassword(payload));
    },
    [dispatch],
  );

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: ({ code }) => {
      void dispatch(authActions.loginWithGoogle({ code }));
    },

    flow: 'auth-code',
  });

  const handleFacebookLogin = useCallback(
    (payload: UserSignInWithFacebookResponseDto): void => {
      void dispatch(authActions.signInWithFacebook(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    if (matchPath({ path: AppRoute.RESET_PASSWORD_$TOKEN }, pathname)) {
      return <ResetPasswordForm onSubmit={handleResetPasswordSubmit} />;
    }

    switch (screen) {
      case AppRoute.SIGN_IN: {
        return (
          <SignInForm
            onSubmit={handleSignInSubmit}
            onGoogleLogin={handleGoogleLogin}
            onFacebookLogin={handleFacebookLogin}
          />
        );
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
      case AppRoute.FORGOT_PASSWORD: {
        return <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />;
      }
    }

    return null;
  };

  return <AuthLayout>{getScreen(pathname)}</AuthLayout>;
};

export { Auth };
