import {
  Button,
  Input,
  Link,
  Notification,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import { type UserSignInWithFacebookResponseDto } from '~/packages/auth/auth.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';
import {
  AuthSubmitButton,
  FacebookLogin,
  PasswordInput,
} from '~/pages/auth/components/components.js';

import { DEFAULT_LOGIN_PAYLOAD } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isLoading: boolean;
  onSubmit: (payload: UserSignInRequestDto) => void;
  onGoogleLogin: () => void;
  onFacebookLogin: (payload: UserSignInWithFacebookResponseDto) => void;
};

const SignInForm: React.FC<Properties> = ({
  isLoading,
  onSubmit,
  onGoogleLogin,
  onFacebookLogin,
}) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

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
        <div className={styles.socialsSignInButtons}>
          <Button
            variant="outlined"
            onClick={onGoogleLogin}
            label="Sign in with Google"
          />
          <FacebookLogin onLogin={onFacebookLogin} />
        </div>
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
              Forgot password?
            </Link>
          </fieldset>
          <AuthSubmitButton isDisabled={isLoading} label="Sign In" />
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
