import { Input, Link, Notification } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppDispatch, useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type UserSignInWithFacebookResponseDto } from '~/packages/auth/auth.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { AuthSubmitButton } from '../auth-submit-button/auth-submit-button.js';
import { AuthSignInButton } from '../components.js';
import { FacebookLoginButton } from '../facebook-login-button/facebook-login-button.js';
import { PasswordInput } from '../password-input/password-input.js';
import { DEFAULT_LOGIN_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
  onGoogleLogin: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit, onGoogleLogin }) => {
  const dispatch = useAppDispatch();
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const handleFacebookLogin = useCallback(
    (response: UserSignInWithFacebookResponseDto): void => {
      void dispatch(authActions.signInWithFacebook(response));
    },
    [dispatch],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <Notification />
      <div className={styles.formWrapper}>
        <h2 className={styles.authFormTitle}>Hello!</h2>
        <AuthSignInButton
          onClick={onGoogleLogin}
          label="Sign in with Google"
        ></AuthSignInButton>
        <FacebookLoginButton onLogin={handleFacebookLogin} />
        <span className={styles.or}>or</span>
        <form
          className={styles.form}
          name="loginForm"
          onSubmit={handleFormSubmit}
        >
          <fieldset className={styles.fieldset}>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email"
              control={control}
              errors={errors}
            />
            <PasswordInput
              name="password"
              label="Password"
              errors={errors}
              control={control}
              placeholder="Enter password"
            />
            <Link
              className={styles.forgotPasswordLink}
              to={AppRoute.FORGOT_PASSWORD}
            >
              Forgot password ?
            </Link>
          </fieldset>
          <AuthSubmitButton label="Sign In" />
        </form>
      </div>
      <div className={styles.messageWrapper}>
        <span className={styles.message}>No account?</span>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
      </div>
    </>
  );
};

export { SignInForm };
