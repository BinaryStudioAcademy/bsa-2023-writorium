import hidePasswordIcon from '~/assets/img/hidePassword.svg';
import showPasswordIcon from '~/assets/img/showPassword.svg';
import { Button, Input, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';
import { DEFAULT_LOGIN_PAYLOAD } from '~/pages/auth/components/sign-in-form/libs/common/constants.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const handleTogglePasswordVisibility = useCallback((): void => {
    setPasswordVisibility((previousValue) => !previousValue);
  }, [setPasswordVisibility]);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Hello!</h2>
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
          <div className={styles.passwordInputWrapper}>
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={handleTogglePasswordVisibility}
            >
              <img
                className={styles.passwordIcon}
                src={isPasswordVisible ? showPasswordIcon : hidePasswordIcon}
                alt={
                  isPasswordVisible
                    ? 'hide-password-icon'
                    : 'show-password-icon'
                }
              />
            </button>
            <Input
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter password"
              label="Password"
              control={control}
              errors={errors}
            />
          </div>
        </fieldset>
        <Button className={styles.submitBtn} type="submit" label="Sign In" />
      </form>
      <div>
        <span className={styles.message}>No account?</span>
        <Link className={styles.link} to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export { SignInForm };
