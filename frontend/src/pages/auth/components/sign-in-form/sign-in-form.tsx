import { UserValidationMessage } from 'shared/build/packages/users/users.js';

import { Button, Icon, Input, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_LOGIN_PAYLOAD } from './libs/constants/constants.js';
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
            className={
              errors?.email?.message === UserValidationMessage.EMAIL_REQUIRE
                ? styles.errorInput
                : ''
            }
          />
          <div className={styles.passwordInputWrapper}>
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={handleTogglePasswordVisibility}
            >
              <Icon
                iconName={isPasswordVisible ? 'view' : 'hide'}
                className={styles.icon}
              />
            </button>
            <Input
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter password"
              label="Password"
              control={control}
              errors={errors}
              className={
                errors?.password?.message ===
                UserValidationMessage.PASSWORD_REQUIRE
                  ? styles.errorInput
                  : ''
              }
            />
          </div>
        </fieldset>
        <Button className={styles.submitButton} type="submit" label="Sign In" />
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
